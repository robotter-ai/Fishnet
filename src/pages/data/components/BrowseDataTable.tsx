import { Buffer } from 'buffer';
import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import {Link, useNavigate} from 'react-router-dom';
import { createTransaction, sendTransaction } from '@slices/transactionSlice';
import { useAuth } from '@contexts/auth-provider';
import { VersionedTransaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import useDownloadDataset from '../hooks/useDownloadDataset';
import { IDataset } from '@store/data/types';

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const { address } = useAuth();
  const { signTransaction } = useWallet();
  const navigate = useNavigate();
  const { handleDownload, isLoading : isDownloading } = useDownloadDataset();

  const handlePurchase = async (
    dataset: IDataset
  ) => {
    if (!dataset.item_hash) throw new Error('Item hash is undefined');
    if (!signTransaction) throw new Error('Wallet not connected');

    const { transaction } = await createTransaction({
      signer: address,
      datasetId: dataset.item_hash,
    })

    const serializedBuffer = Buffer.from(transaction, 'base64');
    const unsignedTransaction = VersionedTransaction.deserialize(serializedBuffer);
    const signedTransaction = await signTransaction(unsignedTransaction);
    const signedSerializedBase64 = Buffer.from(signedTransaction.serialize()).toString('base64');
    const response = await sendTransaction({
        transaction: signedSerializedBase64,
        datasetId: dataset.item_hash,
    });

    console.log(response);

    navigate(`/data/${dataset.item_hash}`);
  };

  const COLUMNS: ITableColumns[] = [
    {
      header: 'NAME',
      cell: (item) => (
        <div className="min-w-[210px]">
          <Link
            to={`/data/${item.item_hash}`}
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
          ) : address === '' ?
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