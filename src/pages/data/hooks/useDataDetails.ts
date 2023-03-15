import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import {
  changeDataDetails,
  getDatasetByID,
  resetDataDetails,
  resetDataSlice,
  uploadDatasets,
} from '@slices/dataSlice';
import { useParams } from 'react-router-dom';
import {uploadTimeseries} from "@slices/timeseriesSlice";

export default () => {
  const { id } = useParams();
  const { setTitle } = usePageTitle();
  const { userInfo } = useAppSelector((app) => app.profile);
  const dispatch = useAppDispatch();
  const {
    dataDetails,
    uploadDatasets: uploadActions,
    datasetByIDActions,
  } = useAppSelector((app) => app.datasets);
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: isOpenNewChart,
    handleOpen: handleOpenNewChart,
    handleClose: handleCloseNewChart,
  } = useModal();
  const isPublished = id && id !== 'upload';

  useEffect(() => {
    if (isPublished) {
      dispatch(getDatasetByID(id));
    } else {
      dispatch(resetDataDetails());
    }
    dispatch(changeDataDetails({ name: 'owner', value: userInfo?.username }));
    dispatch(changeDataDetails({ name: 'ownsAllTimeseries', value: true }));
  }, []);

  useEffect(() => {
    setTitle(dataDetails?.name || 'Datasets.csv');
  }, [dataDetails?.name]);

  useEffect(() => {
    if (uploadActions.success) {
      handleOpen();
      dispatch(resetDataSlice());
    }
  }, [uploadActions.success]);

  const handleUploadDataset = () => {
    dispatch(uploadTimeseries()).then(() => {
      dispatch(uploadDatasets());
    });
  };

  const handleOnChange = (name: string, value: any) => {
    dispatch(changeDataDetails({ name, value }));
  };

  return {
    handleOnChange,
    handleUploadDataset,
    datasetByIDActions,
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
