import transactionsService from '@slices/transactionSlice/transactionService';
import { useAuth } from '@contexts/auth-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { toast } from 'sonner';

// to-do: add toasts
export default () => {
  const navigate = useNavigate();
  const { address } = useAuth();
  const { signTransaction } = useWallet();

  const handlePurchase = useCallback(async (datasetId: string) => {
    if (!datasetId) throw new Error('Item hash is undefined');
    if (!signTransaction) throw new Error('Wallet not connected');

    const { transaction } = await transactionsService.createPaymentTransaction({
      signer: address,
      datasetId
    })

    const serializedBuffer = Buffer.from(transaction, 'base64');
    const unsignedTransaction = VersionedTransaction.deserialize(serializedBuffer);
    const signedTransaction = await signTransaction(unsignedTransaction);
    const signedSerializedBase64 = Buffer.from(signedTransaction.serialize()).toString('base64');
    const response = await transactionsService.sendPaymentTransaction({
      transaction: signedSerializedBase64,
      datasetId,
    });

    navigate(`/data/${datasetId}`);
  }, [address, signTransaction, navigate]);

  const handleCreateTokenAccount = useCallback(async () => {
    try {
      const response = await transactionsService.createTokenAccount({ signer: address });
      
      switch (response.status) {
        case 200:
          if (response.data.message === 'Token account already exists') {
            return true;
          } else if (response.data.transaction) {
            if (!signTransaction) throw new Error('Wallet not connected');
  
            toast.loading('Creating token account');
  
            const serializedBuffer = Buffer.from(response.data.transaction, 'base64');
            const unsignedTransaction = VersionedTransaction.deserialize(serializedBuffer);
            const signedTransaction = await signTransaction(unsignedTransaction);
            const transaction = Buffer.from(signedTransaction.serialize()).toString('base64');
            const responseSend = await transactionsService.sendTransaction({ transaction });
            
            if (responseSend.status === 200) {
              toast.success('Token account created successfully');
              return true;
            } else {
              toast.error('Failed to send transaction');
              return false;
            }
          }
          break;
  
        case 404:
          toast.message('Ensure you have SOL in your wallet');
          return false;
  
        default:
          toast.error('An unexpected error occurred. Please try again later.');
          return false;
      }
  
      return false;
    } catch (error) {
      console.error('Error in handleCreateTokenAccount:', error);
      toast.error('Failed to create token account. Please try again.');
      return false;
    }
  }, [address, signTransaction]);

  return { handlePurchase, handleCreateTokenAccount };
};
