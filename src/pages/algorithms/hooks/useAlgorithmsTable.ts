import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  getAlgorithms,
  getExecutions,
  getPublishedAlgorithms,
  resetUploadActions,
} from '@slices/algorithmSlice';
import useModal from '@shared/hooks/useModal';
import { useSearchParams } from 'react-router-dom';

export default () => {
  const { setTitle } = usePageTitle();
  const { isSelect } = useSelectData();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading,
    algorithms,
    algorithmDetails,
    uploadActions,
    executions,
    executionActions,
    algorithmByIDActions,
    publishedAlgorithms,
  } = useAppSelector((state) => state.algorithm);
  const {
    isOpen: isOpenPublished,
    handleClose: handleClosePublished,
    handleOpen: handleOpenPublished,
  } = useModal();

  const handleOpenAlgorithmDetails = (id: string) => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
  };

  const handleCloseAlgorithmDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (uploadActions.success) {
      handleOpenPublished();
      handleCloseAlgorithmDetails();
      dispatch(resetUploadActions());
      dispatch(getAlgorithms());
      dispatch(getPublishedAlgorithms());
    }
  }, [uploadActions.success]);

  useEffect(() => {
    if (isSelect) {
      setTitle('Select algorithm');
    } else {
      setTitle('Algorithms');
    }
    dispatch(getAlgorithms());
    dispatch(getPublishedAlgorithms());
    dispatch(getExecutions());
  }, [isSelect]);

  return {
    isSelectAlgorithm: isSelect,
    algorithms,
    executions,
    isLoading,
    publishedAlgorithms,
    isLoadingExecution: executionActions.isLoading,
    isOpenPublished,
    handleClosePublished,
    handleOpenAlgoDetails: handleOpenAlgorithmDetails,
    handleCloseAlgoDetails: handleCloseAlgorithmDetails,
    algorithmDetails,
    isLoadingUpload: uploadActions.isLoading,
    isLoadingGetAlgoByID: algorithmByIDActions.isLoading,
  };
};
