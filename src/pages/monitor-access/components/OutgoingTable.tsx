import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getOutgoingPermissions } from '@slices/monitorAccessSlice';
import { StatusIdentifier } from '@shared/constant';
import useAuth from '@shared/hooks/useAuth';
import { ExecutePrompt } from '@shared/components/Prompts';

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
        <p>Usages left: {item.executionCount}</p>
      </>
    ),
    sortWith: 'name',
  },
  {
    header: 'Hash',
    cell: ({ item_hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item_hash}</p>
        <ClickToCopy text={item_hash} />
      </div>
    ),
  },
  {
    header: 'Status',
    cell: ({ status }) => <StatusIdentifier status={status} />,
    sortWith: 'status',
  },
  {
    header: 'Description',
    cell: ({ status }) => <StatusIdentifier status={status} />,
    sortWith: 'status',
  },
  {
    header: '',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: 'Filter',
    cell: ({ item_hash, status }) => (
      <ExecutePrompt
        against="algorithm"
        selectedHash={item_hash}
        disabled={status !== 'ALLOWED'}
      />
    ),
  },
];

const OutgoingTable = () => {
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

export default OutgoingTable;
