import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getOutgoingPermissions } from '@slices/monitorAccessSlice';
import useAuth from '@shared/hooks/useAuth';
import CustomButton from '@components/ui/Button';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    cell: (item) => (
      <>
        <Link
          to={`/data/${item.item_hash}/details`}
          className="text-blue whitespace-nowrap"
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
    sortWith: '',
  },
  {
    header: 'SELLERS WALLET',
    cell: (item) => '',
    sortWith: '',
  },
  {
    header: 'DATE',
    cell: (item) => '',
    sortWith: '',
  },
  {
    header: 'PRICE',
    cell: (item) => '',
    sortWith: '',
  },
  {
    header: '',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: 'Filter',
    cell: ({ item_hash, status }) => (
      <CustomButton text="Download" icon="download" btnStyle="outline-blue" />
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
