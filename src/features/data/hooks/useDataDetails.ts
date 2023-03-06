import { useEffect, useState } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { toast } from 'react-toastify';
import { resetDataSlice, uploadDatasets } from '../slices/dataSlice';

export default () => {
  const { setTitle } = usePageTitle();
  const { state } = useLocation();
  const [inputs, setInputs] = useState({
    dataName: state?.name,
    owner: state?.owner,
    id_hash: state?.id_hash,
    desc: state?.desc,
  });
  const dispatch = useAppDispatch();
  const { isLoading, success, error } = useAppSelector(
    (app) => app.datasets.uploadDatasets
  );
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: isOpenNewChart,
    handleOpen: handleOpenNewChart,
    handleClose: handleCloseNewChart,
  } = useModal();
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    setTitle(state?.name);
  }, []);

  useEffect(() => {
    if (success) {
      handleOpen();
      setIsPublished(true);
      dispatch(resetDataSlice());
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleUploadDataset = () => {
    dispatch(
      uploadDatasets({
        ...inputs,
        ownsAllTimeseries: true,
        timeseriesIDs: [''],
      })
    );
  };

  const handleOnChange = (name: string, value: any) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'dataName') {
      setTitle(value);
    }
  };

  return {
    inputs,
    handleOnChange,
    handleUploadDataset,
    isLoading,
    isPublished,
    publishedModalProps: { handleClose, isOpen },
    newChartModalProps: {
      isOpenNewChart,
      handleOpenNewChart,
      handleCloseNewChart,
    },
  };
};
