import {IDatasetRequest, useGetDatasetsQuery} from "@slices/dataSlice";
import {IRegisterBuy, useRegisterBuyQuery, useValidateSignatureMutation} from "@slices/transactionSlice";
import {FISHNET_MARKETPLACE, FISHNET_MARKETPLACE_AUTH, SOLANA_CONNECTION, USDC_MINT} from "@shared/constant";
import {useEffect, useState} from "react";
import {Buffer} from "buffer";
import {VersionedTransaction} from "@solana/web3.js";
import {useAppDispatch} from "@shared/hooks/useStore";
import {useWallet} from "@solana/wallet-adapter-react";
import useAuth from "@shared/hooks/useAuth";

export default () => {
  const dispatch = useAppDispatch();
  const { sendTransaction } = useWallet();
  const { address } = useAuth();
  const [signature, setSignature] = useState<string>('');
  const [registerBuyParams, setRegisterBuyParams] = useState<IRegisterBuy | null>(null);

  const { data: registerBuyResponse, isLoading: isLoadingRegisterBuy, isSuccess: isSuccessRegisterBuy } =
    useRegisterBuyQuery(registerBuyParams, {
      skip: !registerBuyParams,
      }
    );

  const [validateSignature, { isLoading: isLoadingValidateSignature }] =
    useValidateSignatureMutation();

  const handlePurchase = async (
    dataset: IDatasetRequest
  ) => {
    if (dataset.item_hash === undefined) {
      throw new Error('Item hash is undefined');
    }
    const params = {
      signer: address,
      marketplace: FISHNET_MARKETPLACE,
      productId: dataset.item_hash,
      paymentMint: USDC_MINT,
      seller: dataset.owner,
      marketplaceAuth: FISHNET_MARKETPLACE_AUTH,
      params: {
        rewardsActive: false,
        amount: 1,
        name: dataset.name,
      },
    };
    setRegisterBuyParams({ params });
  };

  useEffect(() => {
    if (registerBuyResponse && isSuccessRegisterBuy) {
      const serializedBase64 = registerBuyResponse.transaction;
      const serializedBuffer = Buffer.from(serializedBase64, 'base64');
      const transaction = VersionedTransaction.deserialize(serializedBuffer);

      const processTransaction = async () => {
        try {
          const sig = await sendTransaction(transaction, SOLANA_CONNECTION);
          const blockhash = await SOLANA_CONNECTION.getLatestBlockhash(
            'finalized'
          );
          await SOLANA_CONNECTION.confirmTransaction(
            {
              blockhash: blockhash.blockhash,
              lastValidBlockHeight: blockhash.lastValidBlockHeight,
              signature: sig,
            },
            'confirmed'
          );
          setSignature(sig);
        } catch (error) {
          console.error('Error sending transaction:', error);
        }
      };

      processTransaction();
    }
  }, [registerBuyResponse, isSuccessRegisterBuy]);

  useEffect(() => {
    if (signature) {
      validateSignature({
        signature,
        itemHash: registerBuyParams?.params.productId as string,
      });
    }
  }

  return { handlePurchase };
}