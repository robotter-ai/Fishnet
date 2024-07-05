import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppSelector } from '@shared/hooks/useStore';
import CustomButton from '@components/ui/Button';
import dayjs from 'dayjs';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    cell: (item) => (
      <Link
        to={`/${item.datasetId}/details`}
        className="text-primary whitespace-nowrap"
      >
        {item.datasetName}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'SELLER',
    cell: (item) => item.seller,
    sortWith: 'item',
  },
  {
    header: 'DATE',
    cell: (item) => dayjs(item.timestamp).format('DD.MM.YYYY'),
    sortWith: 'timestamp',
  },
  {
    header: 'PRICE',
    cell: (item) => item.amount,
    sortWith: 'item',
  },
  {
    header: '',
    //@todo
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: '',
    cell: () => (
      <CustomButton
        text="Download"
        icon="download"
        btnStyle="outline-primary"
      />
    ),
  },
];

const BoughtDataTable = () => {
  const { getTransactions } = useAppSelector((state) => state.transactions);
  console.log(getTransactions.purchases)
  return (
    <CustomTable
      data={getTransactions.purchases}
      columns={COLUMNS}
      isLoading={getTransactions.isLoading}
    />
  );
};

export default BoughtDataTable;
