import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useEffect, useMemo, useState } from 'react';
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
import { useLazyGetDatasetByIdQuery } from '@store/data/api';
import { IDataset } from '@store/data/types';

type Permission = {
  authorizer: string;
  changed: boolean;
  current_revision: number;
  datasetID: string;
  forgotten: boolean;
  item_hash: string;
  requestor: string;
  revision_hashes: string[];
  signer: string;
  status: string;
  timeseriesID: string;
  timestamp: number;
};

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
        to={`/data/${item.name}`}
        className="text-primary whitespace-nowrap"
      >
        {item.dataset?.name || ''}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Description',
    cell: (item) => item.dataset?.desc || '',
  },
  {
    header: 'BUYERS Wallet',
    cell: ({ requestor }) => requestor,
    sortWith: 'requestor',
  },
  {
    header: 'DLs',
    cell: (item) => item.dataset?.downloads || '',
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
  
  const { data: incomingPermissions } = useGetIncomingPermissionsQuery({
    address: auth?.address,
  }, { skip: !auth?.address });

  const filteredPermissions = useMemo(() => {
    return incomingPermissions?.filter((permission: Permission) => permission.status === 'REQUESTED') || [];
  }, [incomingPermissions]);

  const uniqueDatasetIds = useMemo(() => {
    const ids = filteredPermissions.map((permission: Permission) => permission.datasetID);
    return [...new Set(ids)];
  }, [filteredPermissions]);

  const [fetchDatasetById] = useLazyGetDatasetByIdQuery();
  const [datasets, setDatasets] = useState<IDataset[]>([]);
  const [loadingDatasets, setLoadingDatasets] = useState(false);

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoadingDatasets(true);
      try {
        const results = await Promise.all(uniqueDatasetIds.map(datasetID =>
          fetchDatasetById({ datasetID: datasetID as string, view_as: auth?.address as string }).unwrap()
        ));
        setDatasets(results);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoadingDatasets(false);
      }
    };

    if (uniqueDatasetIds.length > 0) {
      fetchDatasets();
    }
  }, [uniqueDatasetIds, fetchDatasetById, auth?.address]);

  const combinedData = filteredPermissions.map((permission: Permission) => ({
    ...permission,
    dataset: datasets.find((data: IDataset) => data.item_hash === permission.datasetID) || null,
  }));

  const [
    denyPermissions,
    { isLoading: isLoadingDenyPermissions, isSuccess: isSuccessDenyPermission },
  ] = useDenyPermissionsMutation();

  const handleRefusePermision = (item_hashes: string[]) => {
    denyPermissions({ item_hashes });
  };

  return (
    <CustomTable
      data={combinedData}
      columns={COLUMNS({
        handleRefusePermision,
        isSuccessDenyPermission,
        isLoadingDenyPermissions,
      })}
      isLoading={loadingDatasets}
    />
  );
};

export default IncomingTable;
