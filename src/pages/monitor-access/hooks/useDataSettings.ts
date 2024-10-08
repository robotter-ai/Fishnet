import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@shared/hooks/useStore';
import { useGetDatasetByIdQuery } from '@store/data/api';
import { setPermissionsInput } from '@store/monitor-access/slice';
import usePageTitle from '@shared/hooks/usePageTitle';

export default () => {
  const auth = useAuth();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { setTitle } = usePageTitle();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();

  const { data, isSuccess } = useGetDatasetByIdQuery({
    datasetID: id as string,
    view_as: auth.address,
  });

  useEffect(() => {
    if (isSuccess) {
      setTitle(data.name);
    }
  }, [isSuccess]);

  const handleOpenAddAccess = () => {
    dispatch(setPermissionsInput({ input: 'datasetID', value: id }));
    handleOpenAccessSettings();
  };

  return {
    dataset: data,
    isOpenAccessSettings,
    handleCloseAccessSettings,
    handleOpenAccessSettings: handleOpenAddAccess,
  };
};
