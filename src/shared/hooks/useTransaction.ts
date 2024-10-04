import { useDepositMutation, useWithdrawMutation, useSendTransactionMutation } from '@store/transactions/api';
import { useAuth } from '@contexts/auth-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { Buffer } from 'buffer';
import { toast } from 'sonner';

export default () => {
  const { address } = useAuth();
  const { signTransaction } = useWallet();
  const [depositMutation] = useDepositMutation();
  const [withdrawMutation] = useWithdrawMutation();
  const [sendTransactionMutation] = useSendTransactionMutation();

  const signAndSendTransaction = useCallback(async (transaction: string) => {
    if (!signTransaction) throw new Error('Wallet not connected');

    const serializedBuffer = Buffer.from(transaction, 'base64');
    const unsignedTransaction = VersionedTransaction.deserialize(serializedBuffer);
    const signedTransaction = await signTransaction(unsignedTransaction);
    const signedSerializedBase64 = Buffer.from(signedTransaction.serialize()).toString('base64');
    
    return sendTransactionMutation({ transaction: signedSerializedBase64 }).unwrap();
  }, [signTransaction, sendTransactionMutation]);

  const deposit = useCallback(async (amount: number, delegate: string) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const { transaction, botId } = await depositMutation({ owner: address, amount, delegate }).unwrap();
      const { signature } = await signAndSendTransaction(transaction);
      toast.success(`Deposit successful. Bot ID: ${botId}, Signature: ${signature}`);
      return { botId, signature };
    } catch (error) {
      console.error('Deposit failed:', error);
      toast.error('Deposit failed. Please try again.');
      throw error;
    }
  }, [address, depositMutation, signAndSendTransaction]);

  const withdraw = useCallback(async (botId: number) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const { transaction } = await withdrawMutation({ owner: address, botId }).unwrap();
      const { signature } = await signAndSendTransaction(transaction);
      toast.success(`Withdrawal successful. Signature: ${signature}`);
      return { signature };
    } catch (error) {
      console.error('Withdrawal failed:', error);
      toast.error('Withdrawal failed. Please try again.');
      throw error;
    }
  }, [address, withdrawMutation, signAndSendTransaction]);

  return { deposit, withdraw };
};