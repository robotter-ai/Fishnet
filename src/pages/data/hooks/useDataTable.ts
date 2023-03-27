import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import Papa from 'papaparse';
import { getDatasets } from '@slices/dataSlice';
import { setCsvJson, preprocessTimeseries } from '@slices/timeseriesSlice';
import { useNavigate } from 'react-router-dom';
import useSelectData from '@shared/hooks/useSelectData';

export default () => {
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const { isSelect } = useSelectData();
  const { isLoading, datasets, error } = useAppSelector(
    (state) => state.datasets
  );
  const { auth } = useAppSelector((state) => state.profile);
  const { isLoading: isLoadingUploadTimeseries } = useAppSelector(
    (state) => state.timeseries
  );

  useEffect(() => {
    setTitle('Data');
    dispatch(getDatasets());
  }, [dispatch]);

  const handleCsvToJson = (file: any) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        dispatch(setCsvJson(results.data));
      },
    });
    const formData = new FormData();
    formData.append('owner', auth.address);
    formData.append('data_file', file);
    dispatch(preprocessTimeseries(formData)).then(() => {
      navigate(`/data/${'upload'}/details`);
    });
  };

  return {
    data: datasets,
    isSelectData: isSelect,
    isLoading,
    error,
    handleCsvToJson,
    isLoadingUploadTimeseries,
  };
};
