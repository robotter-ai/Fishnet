import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import Papa from 'papaparse';
import { getDatasets, getPublishedDatasets } from '@slices/dataSlice';
import { setCsvJson, preprocessTimeseries } from '@slices/timeseriesSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSelectData from '@shared/hooks/useSelectData';
import useAuth from '@shared/hooks/useAuth';

export default () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const { isSelect } = useSelectData();
  const [searchParams] = useSearchParams();
  const { isLoading, datasets, publishedDatasets } = useAppSelector(
    (state) => state.datasets
  );
  const { isLoading: isLoadingUploadTimeseries } = useAppSelector(
    (state) => state.timeseries
  );
  const [filterParams, setFilterParams] = useState({
    value: '',
    data: datasets || [],
  });

  const query: 'published' | 'browse-data' =
    (searchParams.get('tab') as 'published' | 'browse-data') || 'browse-data';

  const dataMapper: Record<'published' | 'browse-data', any> = {
    published: publishedDatasets.data,
    'browse-data': datasets,
  };
  const dataToUse = dataMapper[query];

  useEffect(() => {
    setFilterParams((prevState) => ({
      ...prevState,
      data: dataToUse,
    }));
  }, [query, datasets, publishedDatasets.data]);

  useEffect(() => {
    setTitle('Data');
    dispatch(getDatasets(auth?.address));
    dispatch(getPublishedDatasets(auth?.address));
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
    formData.append('owner', auth?.address);
    formData.append('data_file', file);
    dispatch(preprocessTimeseries(formData)).then(() => {
      navigate(`/data/${'upload'}/details`);
    });
  };

  const handleFilterTable = (value: any) => {
    if (!value) return setFilterParams({ value, data: dataToUse });
    return setFilterParams({
      value,
      data: dataToUse.filter(({ name }: any) =>
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
    handleCsvToJson,
    isLoadingUploadTimeseries,
  };
};
