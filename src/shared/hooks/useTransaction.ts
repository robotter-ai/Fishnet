import { useAuth } from '@contexts/auth-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { Buffer } from 'buffer';
import { toast } from 'sonner';

interface DepositResult {
  botId: number;
  signature: string;
  mangoAccount?: string;
}

interface WithdrawResult {
  signature: string;
}

interface TransactionError extends Error {
  data?: {
    message?: string;
  };
  error?: string
}

export const useTransactions = () => {
  const { address } = useAuth();
  const { signTransaction } = useWallet();

  const signAndSendTransaction = useCallback(async (transaction: string): Promise<{ signature: string }> => {
    if (!signTransaction) throw new Error('Wallet not connected');

    try {
      const serializedBuffer = Buffer.from(transaction, 'base64');
      const unsignedTransaction = VersionedTransaction.deserialize(serializedBuffer);
      const signedTransaction = await signTransaction(unsignedTransaction);
      const signedSerializedBase64 = Buffer.from(signedTransaction.serialize()).toString('base64');
      
      const response = await fetch(`${import.meta.env.VITE_TRANSACTIONS_API_URL}/sendTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transaction: signedSerializedBase64 }),
      });

      if (!response.ok) {
        throw new Error('Failed to send transaction');
      }

      const result = await response.json();
      return { signature: result.signature };
    } catch (error) {
      console.error('Transaction signing or sending failed:', error);
      throw new Error('Failed to sign or send transaction');
    }
  }, [signTransaction]);

  const handleTransactionError = useCallback((error: unknown, operation: string) => {
    console.error(`${operation} failed:`, error);
    const transactionError = error as TransactionError;
    const errorMessage = transactionError.error || transactionError.data?.message || transactionError.message || `${operation} failed. Please try again.`;
    toast.error(errorMessage);
    throw transactionError;
  }, []);

  const deposit = useCallback(async (amount: number, delegate: string): Promise<DepositResult> => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      console.log('Deposit attempt:', { address, amount, delegate });
      const response = await fetch(`${import.meta.env.VITE_TRANSACTIONS_API_URL}/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: address,
          amount,
          delegate
        })
      });
  
      const result = await response.json();
      console.log('Deposit result:', result);
  
      if (!response.ok || !result || typeof result !== 'object' || !result.transaction || !result.botId) {
        throw new Error(result.message || 'Invalid response from deposit request');
      }
  
      const { signature } = await signAndSendTransaction(result.transaction);
      toast.success(`Deposit successful`);
      return { botId: result.botId, signature, mangoAccount: result.mangoAccount };
    } catch (error) {
      return handleTransactionError(error, 'Deposit');
    }
  }, [address, signAndSendTransaction, handleTransactionError]);

  const withdraw = useCallback(async (botId: number): Promise<WithdrawResult> => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_TRANSACTIONS_API_URL}/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: address,
          botId
        })
      });

      const result = await response.json();

      if (!response.ok || !result || typeof result !== 'object' || !result.transaction) {
          return { signature: '' };
      }

      const { signature } = await signAndSendTransaction(result.transaction);
      toast.success(`Withdrawal successful`);
      return { signature };
    } catch (error) {
      return handleTransactionError(error, 'Withdrawal');
    }
  }, [address, signAndSendTransaction, handleTransactionError]);

  return { deposit, withdraw };
};

export default useTransactions;