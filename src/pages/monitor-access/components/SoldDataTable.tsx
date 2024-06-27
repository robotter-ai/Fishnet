import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useAuth from '@shared/hooks/useAuth';
import { useGetOutgoingPermissionsQuery } from '@store/monitor-access/api';

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
    cell: (item) => '',
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

  const { data, isLoading } = useGetOutgoingPermissionsQuery({
    address: auth?.address,
  });

  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default SoldDataTable;
