import { useEffect } from 'react';
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
import useAuth from '@shared/hooks/useAuth';

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
    requestDatasetPermissionActions: { isLoading, success, inputs },
  } = useAppSelector((state) => state.monitorAccess);

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
    inputs,
    isLoading,
    datasetPermission,
    handleAddAccess,
    handleOnchangeInput,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  };
};
