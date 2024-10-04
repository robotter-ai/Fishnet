import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppSelector } from '@shared/hooks/useStore';
import { useAuth } from '@contexts/auth-provider';
import { useGetUserInfoQuery } from '@store/profile/api';
import { IUserInfo } from '@store/profile/types';

export type ITab = 'overview' | 'edit-account' | 'browse-users';

export default () => {
  const session = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setTitle } = usePageTitle();

  const [search, setSearch] = useState('');

  const { data } = useGetUserInfoQuery({ address: session?.address });

  const user = data as IUserInfo;

  const query: ITab = (searchParams.get('tab') as ITab) || 'overview';

  const tabs: { key: ITab; name: string }[] = [
    { key: 'overview', name: 'Overview' },
    { key: 'edit-account', name: 'Edit account' },
    { key: 'browse-users', name: 'Browse users' },
  ];

  const PAGE_TITLE: Record<ITab, string> = {
    overview: 'Profile information',
    'edit-account': 'Update profile information',
    'browse-users': 'Discover new collaborations',
  };

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [query]);

  return {
    tabs,
    user,
    query,
    search,
    setSearch,
    searchParams,
    setSearchParams,
    address: session?.address,
  };
};
