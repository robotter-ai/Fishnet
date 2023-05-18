import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getIncomingPermissions } from '@slices/monitorAccessSlice';
import { StatusIdentifier } from '@shared/constant';
import useAuth from '@shared/hooks/useAuth';

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
    header: 'Hash of data',
    cell: ({ item_hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item_hash}</p>
        <ClickToCopy text={item_hash} />
      </div>
    ),
    sortWith: 'item_hash',
  },
  {
    header: 'Status',
    cell: ({ status }) => <StatusIdentifier status={status} />,
    sortWith: 'status',
  },
  {
    header: 'Request from',
    cell: ({ requestor }) => requestor,
    sortWith: 'requestor',
  },
  {
    header: '',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: 'Filter',
    cell: (item) => (
      <div className="flex gap-2 justify-end">
        {item.status === 'Allowed' ? (
          <Button text="Settings" btnStyle="outline-blue" />
        ) : (
          <Button text="Allow" btnStyle="outline-blue" />
        )}
        <Button text="Refuse" btnStyle="outline-red" />
      </div>
    ),
  },
];

const IncomingTable = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { incomingActions, incomingPermissions } = useAppSelector(
    (state) => state.monitorAccess
  );

  useEffect(() => {
    dispatch(getIncomingPermissions(auth?.address));
  }, []);

  return (
    <CustomTable
      data={incomingPermissions}
      columns={COLUMNS}
      isLoading={incomingActions.isLoading}
    />
  );
};

export default IncomingTable;
