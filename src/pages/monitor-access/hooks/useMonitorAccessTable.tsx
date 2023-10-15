import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useSearchParams } from 'react-router-dom';

export type ITab = 'published' | 'bought' | 'sold' | 'incoming';

export default () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const { setTitle } = usePageTitle();

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

  return { tabs, query, setSearchParams };
};
