import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useEffect, useState } from 'react';
import {
  denyPermissions,
  getIncomingPermissions,
  grantDatasetPermissions,
  resetPermissions,
} from '@slices/monitorAccessSlice';
import { StatusIdentifier } from '@shared/constant';
import useAuth from '@shared/hooks/useAuth';
import { DeletePrompt } from '@shared/components/Prompts';
import AppModal from '@components/ui/AppModal';
import TextInput from '@components/form/TextInput';
import CustomButton from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import { getNotifications } from '@slices/profileSlice';

const AllowComponent = ({ item }: any) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const { isOpen, handleOpen, handleClose } = useModal();
  const [maxExecutionCount, setMaxExecutionCount] = useState(32);
  const {
    grantDatasetPermissionActions: { isLoading, success },
  } = useAppSelector((state) => state.monitorAccess);

  useEffect(() => {
    if (success) {
      dispatch(getIncomingPermissions(auth?.address));
      handleClose();
      resetPermissions();
      dispatch(getNotifications(auth.address));
    }
  }, [success]);

  return (
    <>
      <CustomButton
        text="Allow"
        btnStyle="outline-primary"
        onClick={handleOpen}
      />
      <AppModal
        title="Set the data usage limit"
        isOpen={isOpen}
        withInfo
        handleClose={handleClose}
      >
        <TextInput
          label="How many times may user use the data?"
          placeholder="Set the limit"
          bgColor="#F6F8FB"
          fullWidth
          value={maxExecutionCount}
          onChange={(e) => setMaxExecutionCount(Number(e.target.value))}
        />
        <div className="mt-4">
          <CustomButton
            text="Save"
            size="lg"
            className="mt-4"
            fullWidth
            isLoading={isLoading}
            onClick={() =>
              dispatch(
                grantDatasetPermissions({
                  dataset_id: item.datasetID,
                  inputs: {
                    maxExecutionCount,
                    authorizer: item.authorizer,
                    requestor: item.requestor,
                    algorithmID: item.algorithmID,
                  },
                })
              )
            }
          />
        </div>
      </AppModal>
    </>
  );
};

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
        {item.status === 'GRANTED' ? (
          <CustomButton
            href={`/monitor-access/${item.datasetID}/settings`}
            text="Settings"
            btnStyle="outline-primary"
          />
        ) : (
          <AllowComponent item={item} />
        )}
        <DeletePrompt
          title="Warning!"
          button={(handleOpenRefuseModal) => (
            <CustomButton
              text="Refuse"
              btnStyle="outline-red"
              onClick={handleOpenRefuseModal}
              disabled={item.status === 'DENIED'}
            />
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
      dispatch(getNotifications(auth.address));
    }
  }, [denyPermissionsActions.success]);

  const handleRefusePermision = (item_hashes: string[]) => {
    dispatch(denyPermissions(item_hashes));
  };

  return (
    <CustomTable
      data={incomingPermissions}
      columns={COLUMNS({
        handleRefusePermision,
        denyPermissionsActions,
      })}
      isLoading={incomingActions.isLoading}
    />
  );
};

export default IncomingTable;
