import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import Papa from 'papaparse';
import { getDatasets, getPublishedDatasets } from '@slices/dataSlice';
import { setCsvJson, preprocessTimeseries } from '@slices/timeseriesSlice';
import { useNavigate } from 'react-router-dom';
import useSelectData from '@shared/hooks/useSelectData';

export default () => {
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const { isSelect } = useSelectData();
  const { isLoading, datasets, error, publishedDatasets } = useAppSelector(
    (state) => state.datasets
  );
  const { auth } = useAppSelector((state) => state.profile);
  const { isLoading: isLoadingUploadTimeseries } = useAppSelector(
    (state) => state.timeseries
  );
  const [filterParams, setFilterParams] = useState({
    value: '',
    data: datasets || [],
  });

  useEffect(() => {
    setFilterParams((prevState) => ({ ...prevState, data: datasets }));
  }, [datasets]);

  useEffect(() => {
    setTitle('Data');
    dispatch(getDatasets());
    dispatch(getPublishedDatasets());
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

  const handleFilterTable = (value: any) => {
    if (!value) return setFilterParams({ value, data: datasets });
    return setFilterParams({
      value,
      data: datasets.filter(({ name }: any) =>
        name.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  return {
    data: filterParams.data,
    publishedDatasets,
    filterParams,
    handleFilterTable,
    isSelectData: isSelect,
    isLoading,
    error,
    handleCsvToJson,
    isLoadingUploadTimeseries,
  };
};
