import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useSearchParams } from 'react-router-dom';

export default () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const { setTitle } = usePageTitle();

  const query: string = searchParam.get('tab') || 'published';

  const tabs = [
    { key: 'published', name: 'Published' },
    { key: 'outgoing', name: 'Outgoing' },
    { key: 'incoming', name: 'Incoming' },
  ];

  const PAGE_TITLE: Record<string, string> = {
    published: 'Access and Statistics',
    outgoing: 'Outgoing data requests',
    incoming: 'Incoming data requests',
  };

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [query]);

  return { tabs, query, setSearchParams };
};
