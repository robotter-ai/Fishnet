import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getOutgoingPermissions } from '@slices/monitorAccessSlice';
import useAuth from '@shared/hooks/useAuth';
import CustomButton from '@components/ui/Button';
import dayjs from 'dayjs';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    cell: (item) => (
      <Link
        to={`/data/${item.item_hash}/details`}
        className="text-blue whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'DESCRIPTION',
    cell: (item) => '',
    sortWith: 'item',
  },
  {
    header: 'SELLERS WALLET',
    cell: (item) => '',
    sortWith: 'item',
  },
  {
    header: 'DATE',
    cell: ({ timestamp }) => (
      <p className="whitespace-nowrap">
        {dayjs.unix(timestamp).format('YYYY-MM-DD HH:MM')}
      </p>
    ),
    sortWith: 'timestamp',
  },
  {
    header: 'PRICE',
    cell: (item) => '',
    sortWith: 'item',
  },
  {
    header: '',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: '',
    cell: ({ item_hash, status }) => (
      <CustomButton
        text="Download"
        icon="download"
        btnStyle="outline-primary"
      />
    ),
  },
];

const BoughtDataTable = () => {
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

export default BoughtDataTable;
