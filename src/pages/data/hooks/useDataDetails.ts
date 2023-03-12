import { useEffect, useState } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { toast } from 'react-toastify';
import { resetDataSlice, uploadDatasets } from '@slices/dataSlice';

export default () => {
  const { setTitle } = usePageTitle();
  const { userInfo } = useAppSelector((app) => app.profile);
  const dispatch = useAppDispatch();
  const { dataDetails, uploadDatasets: uploadActions } = useAppSelector(
    (app) => app.datasets
  );
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: isOpenNewChart,
    handleOpen: handleOpenNewChart,
    handleClose: handleCloseNewChart,
  } = useModal();
  const [inputs, setInputs] = useState({
    name: dataDetails?.name || '',
    owner: userInfo?.username || '',
    desc: dataDetails?.desc || '',
  });
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    setTitle('Datasets.csv');
  }, []);

  useEffect(() => {
    if (uploadActions.success) {
      handleOpen();
      setIsPublished(true);
      dispatch(resetDataSlice());
    }
    if (uploadActions.error) {
      toast.error(uploadActions.error);
    }
  }, [uploadActions.success, uploadActions.error]);

  const handleUploadDataset = () => {
    dispatch(
      uploadDatasets({
        ...inputs,
        ownsAllTimeseries: true,
        timeseriesIDs: ['anything6457for878now22bbf'],
      })
    );
  };

  const handleOnChange = (name: string, value: any) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'name') {
      setTitle(value);
    }
  };

  return {
    inputs,
    handleOnChange,
    handleUploadDataset,
    isLoading: uploadActions.isLoading,
    isPublished,
    dataDetails,
    publishedModalProps: { handleClose, isOpen },
    newChartModalProps: {
      isOpenNewChart,
      handleOpenNewChart,
      handleCloseNewChart,
    },
  };
};
