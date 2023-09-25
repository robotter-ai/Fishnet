import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getOutgoingPermissions } from '@slices/monitorAccessSlice';
import useAuth from '@shared/hooks/useAuth';

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
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { outgoingActions, outgoingPermissions } = useAppSelector(
    (state) => state.monitorAccess
  );

  useEffect(() => {
    dispatch(getOutgoingPermissions(auth.address));
  }, []);

  return (
    <CustomTable
      data={outgoingPermissions}
      columns={COLUMNS}
      isLoading={outgoingActions.isLoading}
    />
  );
};

export default SoldDataTable;
