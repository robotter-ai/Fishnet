import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { useState, useEffect } from 'react';
import { useAuth } from '@contexts/auth-provider';
import { useGetDatasetByIdQuery } from '@store/data/api';
import { setPermissionsInput } from '@store/monitor-access/slice';

export default () => {
  const auth = useAuth();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();

  const [dataset, setDataset] = useState<Record<string, any>>({
    name: '',
    price: 0,
  });
  const { data, isSuccess } = useGetDatasetByIdQuery({
    datasetID: id as string,
    view_as: auth.address,
  });

  useEffect(() => {
    if (isSuccess) {
      setDataset(data);
    }
  }, [isSuccess]);

  const handleOpenAddAccess = () => {
    dispatch(setPermissionsInput({ input: 'datasetID', value: id }));
    handleOpenAccessSettings();
  };

  return {
    dataset,
    isOpenAccessSettings,
    handleCloseAccessSettings,
    handleOpenAccessSettings: handleOpenAddAccess,
  };
};
