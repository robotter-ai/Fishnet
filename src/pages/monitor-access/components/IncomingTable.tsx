import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import ClickToCopy from '@components/ui/ClickToCopy';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getIncomingPermissions } from '@slices/monitorAccessSlice';
import { StatusIdentifier } from '@shared/constant';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    cell: (item) => (
      <Link
        to={`/data/${item.id_hash}/details`}
        className="text-blue whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    isSortable: true,
  },
  {
    header: 'Hash of data',
    cell: ({ id_hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{id_hash}</p>
        <ClickToCopy text={id_hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Status',
    cell: ({ status }) => <StatusIdentifier status={status} />,
    isSortable: true,
  },
  {
    header: 'Request from',
    cell: ({ requestor }) => requestor,
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
  const { incomingActions, incomingPermissions } = useAppSelector(
    (state) => state.monitorAccess
  );

  useEffect(() => {
    dispatch(getIncomingPermissions());
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
