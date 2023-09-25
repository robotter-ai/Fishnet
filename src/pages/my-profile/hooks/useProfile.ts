import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageTitle from '@shared/hooks/usePageTitle';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useOnChange from '@shared/hooks/useOnChange';
import { getAllUsers, getUserInfo, updateUserInfo } from '@slices/profileSlice';
import useAuth from '@shared/hooks/useAuth';
import { getTransactions as queryTransaction } from '@slices/indexerSlice';

export type ITab = 'overview' | 'edit-account' | 'browse-users';

export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { setTitle } = usePageTitle();
  const { isSelect } = useSelectData();
  const auth = useAuth();
  const { userInfo, updateActions, allUsers } = useAppSelector(
    (app) => app.profile
  );
  const { getTransactions } = useAppSelector((app) => app.indexer);
  const { inputs, handleOnChange } = useOnChange({
    username: userInfo?.username || '',
    address: auth?.address,
    bio: userInfo?.bio || '',
    email: userInfo?.email || '',
    link: userInfo?.link || '',
  });

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

  useEffect(() => {
    dispatch(getUserInfo(auth?.address));
    dispatch(getAllUsers());
    dispatch(
      queryTransaction({ user: 'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7' })
    );
  }, [updateActions.success]);

  const handleUpdateProfile = () => {
    dispatch(updateUserInfo(inputs));
  };

  return {
    query,
    tabs,
    address: auth?.address,
    isSelectUser: isSelect,
    inputs,
    handleOnChange,
    handleUpdateProfile,
    isLoading: updateActions.isLoading,
    allUsers,
    searchParams,
    setSearchParams,
    transactions: getTransactions.transactions,
  };
};
