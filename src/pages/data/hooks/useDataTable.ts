import { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import { setTimeseries } from '@store/data/slice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useGetDatasetsQuery,
  usePreProcessTimeseriesMutation,
} from '@store/data/api';
import { useAuth } from '@contexts/auth-provider';

type DatasetTabs = 'published' | 'browse-data';

export default () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

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

  const [preProcessTimeseries, { isLoading: isLoadingPreprocessTimeseries }] =
    usePreProcessTimeseriesMutation();

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
    ...(auth?.address ? [{ key: 'published', name: 'Published' }] : []),
  ];

  const PAGE_TITLE: Record<string, string> = {
    'browse-data': 'All data',
    published: 'Your data',
  };

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [dispatch, query]);

  const handleCsvToJson = (file: File) => {
    const formData = new FormData();
    formData.append('data_file', file);
    preProcessTimeseries(formData)
      .unwrap()
      .then((res) => {
        dispatch(setTimeseries(res));
        setTitle(file.name);
        navigate(`/data/${'upload'}`);
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
