import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useSearchParams } from 'react-router-dom';
import { IMonitorAccessTab } from '@store/monitor-access/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setMonitorAccessSearchInput } from '@store/monitor-access/slice';

export type ITab = IMonitorAccessTab;

export default () => {
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParams] = useSearchParams();

  const { search } = useAppSelector((state) => state.monitorAccess);

  const query: ITab = (searchParam.get('tab') as ITab) || 'published';

  const tabs: { key: ITab; name: string }[] = [
    { key: 'published', name: 'Published' },
    { key: 'bought', name: 'Bought' },
    { key: 'sold', name: 'Sold' },
    { key: 'incoming', name: 'Incoming requests' },
  ];

  const PAGE_TITLE: Record<ITab, string> = {
    published: 'Access and Statistics',
    bought: 'Bought data',
    sold: 'Sold data',
    incoming: 'Incoming data requests',
  };

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [query]);

  const onChangeSearch = (value: string) => {
    dispatch(setMonitorAccessSearchInput(value));
  };

  return {
    tabs,
    query,
    search,
    onChangeSearch,
    setSearchParams,
  };
};
