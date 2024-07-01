import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { useRequestDatasetPermissionsMutation } from '@store/monitor-access/api';
import { onChangePermissionsInput } from '@store/monitor-access/slice';

export default () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();
  const { permissions } = useAppSelector((state) => state.monitorAccess);

  const [requestPermissions, { isLoading }] =
    useRequestDatasetPermissionsMutation();

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
    dataset: permissions,
    isLoading,
    handleAddAccess,
    handleOnchangeInput,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  };
};
