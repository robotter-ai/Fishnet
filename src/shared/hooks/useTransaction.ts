import { createTransaction, sendTransaction , createTokenAccount, sendNewTokenAccount } from '@slices/transactionSlice';
import { useAuth } from '@contexts/auth-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

// to-do: add toasts
export default () => {
  const navigate = useNavigate();
  const { address } = useAuth();
  const { signTransaction } = useWallet();

  const handlePurchase = useCallback(async (datasetId: string) => {
    if (!datasetId) throw new Error('Item hash is undefined');
    if (!signTransaction) throw new Error('Wallet not connected');

    const { transaction } = await createTransaction({
      signer: address,
      datasetId
    })

    const serializedBuffer = Buffer.from(transaction, 'base64');
    const unsignedTransaction = VersionedTransaction.deserialize(serializedBuffer);
    const signedTransaction = await signTransaction(unsignedTransaction);
    const signedSerializedBase64 = Buffer.from(signedTransaction.serialize()).toString('base64');
    const response = await sendTransaction({
      transaction: signedSerializedBase64,
      datasetId,
    });

    navigate(`/data/${datasetId}`);
  }, [address, signTransaction, navigate]);

  const handleCreateTokenAccount = useCallback(async () => {
    const response = await createTokenAccount({ signer: address });
    if (response.status === 200 && response.data.message === 'Token account already exists') {
      return true;
    } else if (response.status === 200 && response.data.transaction) {
      if (!signTransaction) throw new Error('Wallet not connected');

      const unsignedTransaction = VersionedTransaction.deserialize(response.data.serializedBuffer.data);
      const signedTransaction = await signTransaction(unsignedTransaction);
      const transaction = Buffer.from(signedTransaction.serialize()).toString('base64');
      const responseSend = await sendNewTokenAccount({ transaction });
      if (responseSend.status === 200) {
        return true;
      }
    }
  }, [address, signTransaction]);

  return { handlePurchase, handleCreateTokenAccount };
};
