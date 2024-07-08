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
import { IDataset } from '@store/data/types';

type DatasetTabs = 'published' | 'browse-data';

export default () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setTitle } = usePageTitle();
  const [searchParams] = useSearchParams();

  const query: DatasetTabs =
    (searchParams.get('tab') as DatasetTabs) || 'browse-data';

  const [search, setSearch] = useState<Record<DatasetTabs, string>>({
    'browse-data': '',
    published: '',
  });

  const { all, isLoadingBrowseData } = useGetDatasetsQuery(
    { view_as: auth?.address },
    {
      selectFromResult: ({ data, isLoading }) => ({
        all: data?.filter(
          (item) =>
            (item.name &&
              item.name.toLowerCase().includes(search[query].toLowerCase())) ||
            (item.desc &&
              item.desc.toLowerCase().includes(search[query].toLowerCase()))
        ) as IDataset[],
        isLoadingBrowseData: isLoading,
      }),
    }
  );
  const { published, isLoadingPublishedData } = useGetDatasetsQuery(
    { by: auth?.address },
    {
      selectFromResult: ({ data, isLoading }) => ({
        published: data?.filter(
          (item) =>
            (item.name &&
              item.name.toLowerCase().includes(search[query].toLowerCase())) ||
            (item.desc &&
              item.desc.toLowerCase().includes(search[query].toLowerCase()))
        ) as IDataset[],
        isLoadingPublishedData: isLoading,
      }),
      skip: query !== 'published',
    }
  );

  const [preProcessTimeseries, { isLoading: isLoadingPreprocessTimeseries }] =
    usePreProcessTimeseriesMutation();

  const tabs = [
    { key: 'browse-data', name: 'Browse data' },
    ...(auth?.address ? [{ key: 'published', name: 'Published' }] : []),
  ];

  const PAGE_TITLE: Record<DatasetTabs, string> = {
    'browse-data': 'All data',
    published: 'Your data',
  };

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [dispatch, query]);

  const handlePreProcessTimeseries = (file: File) => {
    const formData = new FormData();
    formData.append('data_file', file);
    const title = file.name.replaceAll('.csv', '');
    preProcessTimeseries(formData)
      .unwrap()
      .then((res) => {
        dispatch(setTimeseries(res));
        setTitle(title);
        navigate(`/data/${'upload'}`);
      });
  };

  const handleChangeSearch = (value: string) => {
    setSearch((prevState) => ({ ...prevState, [query]: value }));
  };

  return {
    tabs,
    query,
    handleChangeSearch,
    isLoadingBrowseData,
    search: search[query],
    isLoadingPublishedData,
    data: { all, published },
    handlePreProcessTimeseries,
    isLoadingPreprocessTimeseries,
  };
};
