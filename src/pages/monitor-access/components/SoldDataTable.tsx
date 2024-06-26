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
          {item.name}
        </Link>
        <Starred starred={item.forgotten} />
      </>
    ),
    sortWith: 'name',
  },
  {
    header: 'DESCRIPTION',
    cell: (item) => '',
    sortWith: 'item',
  },
  {
    header: 'Buyers WALLET',
    cell: (item) => '',
    sortWith: 'item',
  },
  {
    header: 'DATE',
    cell: (item) => dayjs(item.timestamp).format('DD.MM.YYYY'),
    sortWith: 'item',
  },
  {
    header: 'PRICE',
    cell: (item) => '',
    sortWith: 'item',
  },
];

const SoldDataTable = () => {
  const auth = useAuth();
  const { getTransactions } = useAppSelector((state) => state.transactions);
  const soldData = getTransactions.transactions?.filter((tx) => tx.seller === auth.address)

  return (
    <CustomTable
      data={soldData || []}
      columns={COLUMNS}
      isLoading={getTransactions.isLoading}
    />
  );
};

export default SoldDataTable;
