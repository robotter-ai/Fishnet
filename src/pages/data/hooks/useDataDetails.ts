import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import {
  changeDataDetails,
  generateViews,
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
    generateViewActions,
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
    setTitle(dataDetails?.name, dataDetails?.permission_status);
  }, [dataDetails?.name]);

  useEffect(() => {
    if (generateViewActions.success || updateDatasetsActions.success) {
      handleOpen();
      dispatch(resetDataSlice());
    }
  }, [generateViewActions.success, updateDatasetsActions.success]);

  const handleUploadDataset = () => {
    dispatch(uploadDataset());
    const checkDatasetId = setInterval(() => {
      if (dataDetails?.item_hash) {
        dispatch(generateViews({ datasetId: dataDetails?.item_hash }));
        clearInterval(checkDatasetId);
      }
    }, 500);
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
    isLoading: uploadDatasetActions.isLoading || generateViewActions.isLoading,
    isPublished,
    dataDetails,
    publishedModalProps: { handleClose, isOpen },
    updateDatasetsActions,
    handleUpdateDataset,
  };
};
