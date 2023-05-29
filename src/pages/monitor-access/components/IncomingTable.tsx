import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect } from 'react';
import {
  denyPermissions,
  getIncomingPermissions,
  resetPermissions,
} from '@slices/monitorAccessSlice';
import { StatusIdentifier } from '@shared/constant';
import useAuth from '@shared/hooks/useAuth';
import { DeletePrompt } from '@shared/components/Prompts';

const COLUMNS = ({
  handleRefusePermision,
  denyPermissionsActions,
}: {
  denyPermissionsActions: any;
  handleRefusePermision: (id: string[]) => void;
}): ITableColumns[] => [
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
    cell: ({ datasetID }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{datasetID}</p>
        <ClickToCopy text={datasetID} />
      </div>
    ),
    sortWith: 'datasetID',
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
        {item.status === 'ALLOWED' ? (
          <Button text="Settings" btnStyle="outline-blue" />
        ) : (
          <Button text="Allow" btnStyle="outline-blue" />
        )}
        <DeletePrompt
          title="Warning!"
          button={(handleOpen) => (
            <Button text="Refuse" btnStyle="outline-red" onClick={handleOpen} />
          )}
          message="You want to refuse access. Are you sure?"
          isLoading={denyPermissionsActions.isLoading}
          completed={denyPermissionsActions.success}
          onConfirm={() => handleRefusePermision([item.item_hash])}
        />
      </div>
    ),
  },
];

const IncomingTable = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { incomingActions, incomingPermissions, denyPermissionsActions } =
    useAppSelector((state) => state.monitorAccess);

  useEffect(() => {
    dispatch(getIncomingPermissions(auth?.address));
    if (denyPermissionsActions.success) {
      resetPermissions();
    }
  }, [denyPermissionsActions.success]);

  const handleRefusePermision = (item_hashes: string[]) => {
    dispatch(denyPermissions(item_hashes));
  };

  return (
    <CustomTable
      data={incomingPermissions}
      columns={COLUMNS({ handleRefusePermision, denyPermissionsActions })}
      isLoading={incomingActions.isLoading}
    />
  );
};

export default IncomingTable;
