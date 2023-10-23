import { Buffer } from 'buffer';
import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useDownloadDataset from '@pages/data/hooks/useDownloadDataset';
import {IDataset, useGetDatasetsQuery} from '@slices/dataSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  registerBuy as registerBuyRequest,
  validateSignature as validateTransaction,
} from '@slices/transactionSlice';
import useAuth from '@shared/hooks/useAuth';
import {
  FISHNET_MARKETPLACE,
  FISHNET_MARKETPLACE_AUTH,
  SOLANA_CONNECTION,
  USDC_MINT,
} from '@shared/constant';
import { VersionedTransaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { registerBuy } = useAppSelector((state) => state.transaction);
  const { address, hasValidToken } = useAuth();
  const { sendTransaction } = useWallet();
  const [signature, setSignature] = useState<string>('');
  const [selectedItemHash, setItemHash] = useState<string>('');
  const { handleDownload, isLoading : isDownloading } = useDownloadDataset();

  const handlePurchase = async (
    dataset: IDataset
  ) => {
    if (dataset.item_hash === undefined) {
      throw new Error('Item hash is undefined');
    }
    setItemHash(dataset.item_hash);
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
    console.log(params)
    dispatch(
      registerBuyRequest({params})
    );
  };

  useEffect(() => {
    if (registerBuy.transaction && registerBuy.success) {
      const serializedBase64 = registerBuy.transaction;
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
      const { data, isLoading, isError } = useGetDatasetsQuery({ type: 'published', address: address });
    }
  }, [registerBuy.transaction, registerBuy.success]);

  useEffect(() => {
    if (signature !== '') {
      dispatch(
        validateTransaction({
          params: { signature, itemHash: selectedItemHash },
        })
      );
    }
  }, [signature]);

  const COLUMNS: ITableColumns[] = [
    {
      header: 'NAME',
      cell: (item) => (
        <div className="min-w-[210px]">
          <Link
            to={`/data/${item.item_hash}/details`}
            className="text-primary text-sm whitespace-nowrap"
          >
            {item.name}
          </Link>
        </div>
      ),
      sortWith: 'name',
    },
    {
      header: 'DESCRIPTION',
      cell: (item) => <p className="w-[190px] line-clamp-3">{item.desc}</p>,
      sortWith: 'desc',
    },
    {
      header: 'SELLER',
      cell: (item) => <TruncatedAddress address={item.owner} copy />,
      sortWith: 'owner',
    },
    {
      header: 'PRICE',
      cell: ({ price }) =>
        price == 0 ? (
          <div className="flex gap-3 items-center">
            <div className="h-[30px] w-[30px] flex items-center justify-center bg-{#E6FAFF} rounded-full">
              <FreeTagIcon />
            </div>
            <p className="w-[120px]">Free</p>
          </div>
        ) : (
          // make this a component so you can pass use the transaction hook that you wrote in it
          <PriceButton price={price} />
        ),
      sortWith: 'price',
    },
    {
      header: 'DOWNLOADS',
      cell: (item) => <p>{item.downloads ? item.downloads : 0}</p>,
    },
    {
      header: '',
      cell: (dataset) => (
        <div className="w-auto flex items-end justify-end">
          {/* eslint-disable-next-line no-nested-ternary */}
          {dataset.available && dataset.price == 0 || dataset.permission_status === 'GRANTED' ? (
            <CustomButton
              text="Download"
              btnStyle="outline-primary"
              size="sm"
              icon="download"
              isLoading={isDownloading}
              onClick={() => handleDownload(dataset)}
            />
          ) : address === undefined || !hasValidToken ?
            <CustomButton
              text="Wallet required"
              size="sm"
              icon="lock"
              btnStyle="outline-primary"
              disabled={true}
            /> : !dataset.available &&
            dataset.permission_status === 'NOT GRANTED' &&
            dataset.price === '0' ? (
            <CustomButton
              text="Request"
              size="sm"
              icon="lock"
              btnStyle="outline-primary"
            />
          ) : (
            <CustomButton
              text="Buy"
              size="sm"
              icon="buy"
              btnStyle="solid-secondary"
              onClick={() => handlePurchase(dataset)}
            />
          )}
        </div>
      ),
    },
  ];

  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default BrowseDataTable;
