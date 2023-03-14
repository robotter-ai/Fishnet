import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { getDatasets } from '@slices/dataSlice';
import {
  resetTimeseriesActions,
  setCsvJson,
  uploadTimeseries,
} from '@slices/timeseriesSlice';

export default () => {
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const { isLoading, datasets, error } = useAppSelector(
    (state) => state.datasets
  );
  const { userInfo } = useAppSelector((state) => state.profile);
  const {
    isLoading: isLoadingUploadTimeseries,
    success: successUploadTimeseries,
  } = useAppSelector((state) => state.timeseries);

  useEffect(() => {
    setTitle('Data');
    dispatch(getDatasets());
  }, [dispatch]);

  useEffect(() => {
    if (successUploadTimeseries) {
      navigate(`/data/${'upload'}/details`);
      dispatch(resetTimeseriesActions());
    }
  }, [successUploadTimeseries]);

  const handleCsvToJson = (file: any) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        dispatch(setCsvJson(results.data));
      },
    });
    const formData = new FormData();
    formData.append('owner', userInfo?.username);
    formData.append('data_file', file);
    dispatch(uploadTimeseries(formData));
  };

  return {
    data: datasets,
    isLoading,
    error,
    handleCsvToJson,
    isLoadingUploadTimeseries,
  };
};
