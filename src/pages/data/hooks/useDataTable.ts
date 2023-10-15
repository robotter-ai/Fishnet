import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import Papa from 'papaparse';
import { useGetDatasetsQuery } from '@slices/dataSlice';
import { preprocessTimeseries, setCsvJson } from '@slices/timeseriesSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSelectData from '@shared/hooks/useSelectData';
import useAuth from '@shared/hooks/useAuth';

type DatasetTabs = 'published' | 'browse-data';

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
  const { isLoading: isLoadingPreprocessTimeseries } = useAppSelector(
    (state) => state.timeseries
  );

  // START: RTK Query
  const { data: browseData, isLoading: isLoadingBrowseData } =
    useGetDatasetsQuery({
      type: 'browse-data',
      address: auth?.address,
    });
  const { data: publishedData, isLoading: isLoadingPublishedData } =
    useGetDatasetsQuery({
      type: 'published',
      address: auth?.address,
    });

  const query: DatasetTabs =
    (searchParams.get('tab') as DatasetTabs) || 'browse-data';

  const DATA_MAP: Record<DatasetTabs, any> = {
    published: publishedData,
    'browse-data': browseData,
  };

  const dataToUse = DATA_MAP[query] || [];

  const [filterParams, setFilterParams] = useState({
    value: '',
    data: dataToUse,
  });

  const tabs = [
    { key: 'browse-data', name: 'Browse data' },
    { key: 'published', name: 'Published' },
  ];

  const PAGE_TITLE: Record<string, string> = {
    'browse-data': 'All data',
    published: 'Your data',
  };

  // useEffect(() => {
  //   setFilterParams((prevState) => ({
  //     ...prevState,
  //     data: dataToUse,
  //   }));
  //   console.log('first');
  // }, [query]);

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [dispatch, query]);

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
    tabs,
    data: dataToUse,
    publishedDatasets,
    isLoadingBrowseData,
    isLoadingPublishedData,
    filterParams,
    handleFilterTable,
    isSelectData: isSelect,
    isLoading,
    handleCsvToJson,
    isLoadingPreprocessTimeseries,
  };
};
