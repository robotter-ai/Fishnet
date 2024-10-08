import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import {Link} from 'react-router-dom';
import { useAppSelector } from '@shared/hooks/useStore';
import useDownloadDataset from '../hooks/useDownloadDataset';
import useTransaction from '@shared/hooks/useTransaction';

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  console.log(data)
    const { address } = useAppSelector((state) => state.auth);
  const { handlePurchase } = useTransaction();
  const { handleDownload, isLoading : isDownloading } = useDownloadDataset();
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
          {dataset.price === '0' || dataset?.permission_status === 'GRANTED' ? (
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
              onClick={() => handlePurchase(dataset.item_hash)}
            />
          )}
        </div>
      ),
    },
  ];

  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default BrowseDataTable;