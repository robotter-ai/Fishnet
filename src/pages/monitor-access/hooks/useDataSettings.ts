import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { useRequestDatasetPermissionsMutation } from '@store/monitor-access/api';
import { onChangePermissionsInput } from '@store/monitor-access/slice';
import { useState, useEffect } from 'react';
import { useAuth } from '@contexts/auth-provider';
import { useGetDatasetByIdQuery } from '@store/data/api';

export default () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();
  const { permissions } = useAppSelector((state) => state.monitorAccess);
  const [requestPermissions, { isLoading }] =
    useRequestDatasetPermissionsMutation();

  const [dataset, setDataset] = useState<Record<string, any>>({
    name: '',
    price: 0,
  });
  const { data, isSuccess } = useGetDatasetByIdQuery(
    { datasetID: id as string, view_as: auth.address },
  );
  useEffect(() => {
    if (isSuccess) {
      setDataset(data);
    }
  }, [isSuccess]);

  const handleAddAccess = () => {
    requestPermissions({ dataset_id: id as string })
      .unwrap()
      .then(() => handleCloseAccessSettings());
  };

  const handleOnchangeInput = (
    input: 'requestor' | 'algorithmID' | 'requestedExecutionCount',
    value: any
  ) => {
    dispatch(
      onChangePermissionsInput({
        input,
        value,
      })
    );
  };

  return {
    permissions,
    dataset,
    isLoading,
    handleAddAccess,
    handleOnchangeInput,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  };
};
