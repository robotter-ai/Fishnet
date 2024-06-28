import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  changeDatasetPermissionInput,
  getDatasetPermissions,
  requestDatasetPermissions,
  resetPermissions,
} from '@slices/monitorAccessSlice';
import useModal from '@shared/hooks/useModal';
import { getNotifications } from '@slices/profileSlice';
import { useAuth } from '@contexts/auth-provider';
import { useGetDatasetQuery } from '@slices/dataSlice';

export default () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();
  const {
    datasetPermission,
    requestDatasetPermissionActions: { isLoading, success, dataset },
  } = useAppSelector((state) => state.monitorAccess);
  const [datasetInfo, setDataset] = useState<Record<string, any>>({
    name: '',
    price: 0,
  });
  const { data, isSuccess } = useGetDatasetQuery(
    { datasetID: id as string, view_as: auth.address },
  );
  useEffect(() => {
    if (isSuccess) {
      setDataset(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getDatasetPermissions(id as string));
  }, []);

  useEffect(() => {
    if (success) {
      handleCloseAccessSettings();
      resetPermissions();
      dispatch(getNotifications(auth.address));
    }
  }, [success]);

  const handleAddAccess = () => {
    dispatch(requestDatasetPermissions(id as string));
  };

  const handleOnchangeInput = (
    input: 'requestor' | 'algorithmID' | 'requestedExecutionCount',
    value: any
  ) => {
    dispatch(
      changeDatasetPermissionInput({
        input,
        value,
      })
    );
  };

  return {
    dataset,
    datasetInfo,
    isLoading,
    datasetPermission,
    handleAddAccess,
    handleOnchangeInput,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  };
};
