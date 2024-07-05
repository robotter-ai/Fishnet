import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useState } from 'react';
import { useAuth } from '@contexts/auth-provider';
import { DeletePrompt } from '@shared/components/Prompts';
import AppModal from '@components/ui/AppModal';
import TextInput from '@components/form/TextInput';
import CustomButton from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import {
  useDenyPermissionsMutation,
  useGetIncomingPermissionsQuery,
  useGrantDatasetPermissionsMutation,
} from '@store/monitor-access/api';

const AllowComponent = ({ item }: any) => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const [maxExecutionCount, setMaxExecutionCount] = useState(32);

  const [grantPermissions, { isLoading }] =
    useGrantDatasetPermissionsMutation();

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
              grantPermissions({
                dataset_id: item.datasetID,
                requestor: item.requestor,
                maxExecutionCount,
              })
            }
          />
        </div>
      </AppModal>
    </>
  );
};

const COLUMNS = ({
  handleRefusePermision,
  isSuccessDenyPermission,
  isLoadingDenyPermissions,
}: {
  isSuccessDenyPermission: boolean;
  isLoadingDenyPermissions: boolean;
  handleRefusePermision: (id: string[]) => void;
}): ITableColumns[] => [
  {
    header: 'Name',
    cell: (item) => (
      <Link
        to={`/data/${item.item_hash}`}
        className="text-primary whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Description',
    cell: ({ datasetID }) => '',
  },
  {
    header: 'BUYERS Wallet',
    cell: ({ status }) => '',
    sortWith: 'status',
  },
  {
    header: 'DLs',
    cell: ({ requestor }) => '',
    sortWith: 'requestor',
  },
  {
    header: '',
    cell: (item) => (
      <div className="flex gap-2 justify-end">
        {item.status === 'GRANTED' ? (
          <CustomButton
            linkTo={`/monitor-access/${item.datasetID}/settings`}
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
          isLoading={isLoadingDenyPermissions}
          completed={isSuccessDenyPermission}
          onConfirm={() => handleRefusePermision([item.item_hash])}
        />
      </div>
    ),
  },
];

const IncomingTable = () => {
  const auth = useAuth();

  const { data, isLoading } = useGetIncomingPermissionsQuery({
    address: auth?.address,
  });

  const [
    denyPermissions,
    { isLoading: isLoadingDenyPermissions, isSuccess: isSuccessDenyPermission },
  ] = useDenyPermissionsMutation();

  const handleRefusePermision = (item_hashes: string[]) => {
    denyPermissions({ item_hashes });
  };

  return (
    <CustomTable
      data={data}
      columns={COLUMNS({
        handleRefusePermision,
        isSuccessDenyPermission,
        isLoadingDenyPermissions,
      })}
      isLoading={isLoading}
    />
  );
};

export default IncomingTable;
