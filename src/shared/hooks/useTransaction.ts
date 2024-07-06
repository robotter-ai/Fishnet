import { createTransaction, sendTransaction } from '@slices/transactionSlice';
import { useAuth } from '@contexts/auth-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

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

    console.log(response);

    navigate(`/data/${datasetId}`);
  }, [address, signTransaction, navigate]);

  return { handlePurchase };
};
