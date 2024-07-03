import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import { preprocessTimeseries, setTimeseries } from '@slices/timeseriesSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetDatasetsQuery } from '@store/data/api';
import { useAuth } from '@contexts/auth-provider';

type DatasetTabs = 'published' | 'browse-data';

export default () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { isLoading: isLoadingPreprocessTimeseries } = useAppSelector(
    (state) => state.timeseries
  );

  const query: DatasetTabs =
    (searchParams.get('tab') as DatasetTabs) || 'browse-data';

  const { data: all, isLoading: isLoadingBrowseData } = useGetDatasetsQuery(
    {
      type: 'browse-data',
      address: auth?.address,
    },
    { skip: query !== 'browse-data' }
  );
  const { data: published, isLoading: isLoadingPublishedData } =
    useGetDatasetsQuery(
      {
        type: 'published',
        address: auth?.address,
      },
      { skip: query !== 'published' }
    );

  const DATA_MAP: Record<DatasetTabs, any> = {
    published,
    'browse-data': all,
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
    const formData = new FormData();
    formData.append('data_file', file);
    dispatch(preprocessTimeseries(formData)).then((results) => {
      navigate(`/${'upload'}/details`);
      // set name of dataset
      setTitle(file.name);
      // transform results.payload with lists of timeseries
      dispatch(setTimeseries(results.payload));
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
    filterParams,
    handleCsvToJson,
    handleFilterTable,
    isLoadingBrowseData,
    isLoadingPublishedData,
    isLoadingPreprocessTimeseries,
  };
};
