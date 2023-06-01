import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import {
  changeDataDetails,
  getDatasetByID,
  resetDataDetails,
  resetDataSlice,
  updateDatasets,
  uploadDataset,
} from '@slices/dataSlice';
import { useParams } from 'react-router-dom';
import useAuth from '@shared/hooks/useAuth';

export default () => {
  const { id } = useParams();
  const { setTitle } = usePageTitle();
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const {
    dataDetails,
    uploadDatasetActions,
    datasetByIDActions,
    updateDatasetsActions,
  } = useAppSelector((app) => app.datasets);
  const { requestDatasetPermissionActions } = useAppSelector(
    (state) => state.monitorAccess
  );
  const { isOpen, handleOpen, handleClose } = useModal();
  const isPublished = id && id !== 'upload';

  useEffect(() => {
    if (isPublished) {
      dispatch(getDatasetByID({ id, view_as: auth.address }));
    } else {
      dispatch(resetDataDetails());
    }
    dispatch(changeDataDetails({ name: 'owner', value: auth?.address }));
    dispatch(changeDataDetails({ name: 'ownsAllTimeseries', value: true }));
  }, [requestDatasetPermissionActions.success]);

  useEffect(() => {
    setTitle(
      dataDetails?.name || 'Datasets.csv',
      dataDetails?.permission_status
    );
  }, [dataDetails?.name]);

  useEffect(() => {
    if (uploadDatasetActions.success || updateDatasetsActions.success) {
      handleOpen();
      dispatch(resetDataSlice());
    }
  }, [uploadDatasetActions.success, updateDatasetsActions.success]);

  const handleUploadDataset = () => {
    dispatch(uploadDataset());
  };

  const handleUpdateDataset = () => {
    dispatch(updateDatasets());
  };

  const handleOnChange = (name: string, value: any) => {
    dispatch(changeDataDetails({ name, value }));
  };

  return {
    handleOnChange,
    handleUploadDataset,
    datasetByIDActions,
    isLoading: uploadDatasetActions.isLoading,
    isPublished,
    dataDetails,
    publishedModalProps: { handleClose, isOpen },
    updateDatasetsActions,
    handleUpdateDataset,
  };
};
