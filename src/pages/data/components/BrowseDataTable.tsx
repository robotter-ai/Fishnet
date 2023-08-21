import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { downloadTimeseries as downloadTimeseriesRequest } from '@slices/timeseriesSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const handleDownload = (timeseriesIDs: string[]) => {
    dispatch(downloadTimeseriesRequest(timeseriesIDs));
  };
  const { downloadTimeseries } = useAppSelector(
    (state) => state.timeseries
  );

  useEffect(() => {
    if (downloadTimeseries.timeseries) {
      const lines = downloadTimeseries.timeseries.trim().split('\n');
      const normalizedData = lines.map((row: any) => {
        const [timestamp, ...values] = row.split(',');
        return [timestamp, ...values];
      });
      const csvString = Papa.unparse(normalizedData);
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'data.csv';
      downloadLink.style.display = 'none';
    
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
    }
  }, [downloadTimeseries.success])

  const COLUMNS: ITableColumns[] = [
    {
      header: 'NAME',
      cell: (item) => (
        <div className="min-w-[210px]">
          <Link
            to={`/data/${item.item_hash}/details`}
            className="text-blue whitespace-nowrap"
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
      header: 'SELLERS WALLET',
      cell: (item) => <TruncatedAddress hash={item.owner} withCopy />,
      sortWith: 'owner',
    },
    {
      header: 'DLS',
      cell: (item) => (
        <div className="flex w-[100px] gap-3">{item?.forgotten}</div>
      ),
      sortWith: '',
    },
    {
      header: 'PRICE',
      cell: ({ price }) => 
        price == '0' ? (
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
      header: '',
      cell: ({ available, item_hash, permission_status, price, timeseriesIDs }) => (
        <div className="w-auto flex items-end justify-end">
          {/* eslint-disable-next-line no-nested-ternary */}
          {available && price === '1' ? (
            <CustomButton
              text="Download"
              btnStyle="outline-blue"
              size="sm"
              icon="download"
              onClick={() => handleDownload(timeseriesIDs)}
            />
          ) : available && permission_status === 'NOT GRANTED' && price === '0' ? (
            <CustomButton
              text="Request"
              size="sm"
              icon="lock"
              btnStyle="outline-blue"
            />
          ) : (
            <CustomButton
              text="Buy"
              size="sm"
              icon="buy"
              btnStyle="solid-blue"
              onClick={() => handlePurchase(timeseriesIDs)}
            />
          )}
        </div>
      ),
    },
  ];

  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default BrowseDataTable;
