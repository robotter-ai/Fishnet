import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppSelector } from '@shared/hooks/useStore';
import { useAuth } from '@contexts/auth-provider';
import dayjs from 'dayjs';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    cell: (item) => (
      <>
        <Link
          to={`/data/${item.item_hash}/details`}
          className="text-primary whitespace-nowrap"
        >
          {item.datasetName}
        </Link>
      </>
    ),
    sortWith: 'name',
  },
  {
    header: 'Buyers WALLET',
    cell: (item) => item.signer,
    sortWith: 'item',
  },
  {
    header: 'DATE',
    cell: (item) => dayjs(item.timestamp).format('DD.MM.YYYY'),
    sortWith: 'item',
  },
  {
    header: 'PRICE',
    cell: (item) => item.amount,
    sortWith: 'item',
  },
];

const SoldDataTable = () => {
  const { getTransactions } = useAppSelector((state) => state.transactions);

  return (
    <CustomTable
      data={getTransactions.sales}
      columns={COLUMNS}
      isLoading={getTransactions.isLoading}
    />
  );
};

export default SoldDataTable;
