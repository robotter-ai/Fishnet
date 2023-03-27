import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import ClickToCopy from '@components/ui/ClickToCopy';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import { getOutgoingPermissions } from '@slices/monitorAccessSlice';
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
    header: 'Hash',
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
    header: '',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: 'Filter',
    cell: ({ id_hash }) => <Button text="Refuse" btnStyle="outline-red" />,
  },
];

const OutgoingTable = () => {
  const dispatch = useAppDispatch();
  const { outgoingActions, outgoingPermissions } = useAppSelector(
    (state) => state.monitorAccess
  );

  useEffect(() => {
    dispatch(getOutgoingPermissions());
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
