import Button from '@components/ui/Button';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useGetDatasetsQuery } from '@slices/dataSlice';
import PublicAccessToggle from '@shared/components/PublicAccessToggle';
import { useAuth } from '@contexts/auth-provider';
import DataSummary from '@shared/components/Summary';
import DataChart from '@pages/data/components/DataChart';
import { nanoid } from 'nanoid';
import { useAppSelector } from '@store/hooks';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    accessor: 'name',
    cell: (item) => (
      <Link
        to={`/data/${item.item_hash}/details`}
        className="text-primary whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Public access',
    accessor: 'available',
    cell: (item) => (
      <PublicAccessToggle
        available={item.available}
        datasetId={item.item_hash}
      />
    ),
    sortWith: 'available',
  },
  {
    header: 'DLS',
    accessor: 'desc',
    cell: (item) => '',
    sortWith: 'item',
  },
  {
    header: 'Profit',
    accessor: 'desc',
    cell: (item) => '-',
    sortWith: 'item',
  },
  {
    header: 'Price',
    accessor: 'desc',
    cell: (item) => item.price != 0 ? item.price + ' USDC' : "Free",
    sortWith: 'item',
  },
  {
    header: '',
    cell: (item) => (
      <div className="w-auto flex items-end justify-end">
        <Button
          linkTo={`/monitor-access/${item.item_hash}/settings`}
          text="Settings"
          size="sm"
          icon="settings"
          btnStyle="outline-primary"
        />
      </div>
    ),
  },
];

const PublishedTable = () => {
  const { address } = useAuth();

  const publishedDatasets = useGetDatasetsQuery({
    type: 'published',
    address: address,
  });
  const { getTransactions } = useAppSelector((app) => app.transactions);

  const STATISTICS = [
    {
      name: 'Total profit',
      value: getTransactions.totalProfit,
    },
    {
      name: 'Total downloads',
      value: 2158,
    },
    {
      name: 'Unique downloads',
      value: 987,
    },
  ];  

  return (
    <>
      <div className="grid grid-cols-2 gap-5 mb-8">
        <DataSummary title="Comprehensive statistics" summary={STATISTICS} />
        <DataChart
          data={[]}
          chart={{
            id: nanoid(4),
            interval: '',
            keys: [
              { name: 'Profit', color: '#0093A7' },
              { name: 'Downloads', color: '#0055FF' },
            ],
          }}
        />
      </div>
      <CustomTable
        data={publishedDatasets.data}
        columns={COLUMNS}
        isLoading={publishedDatasets.isLoading}
      />
    </>
  );
};

export default PublishedTable;
