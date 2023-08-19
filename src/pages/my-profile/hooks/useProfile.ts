import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useOnChange from '@shared/hooks/useOnChange';
import { getAllUsers, getUserInfo, updateUserInfo } from '@slices/profileSlice';
import useAuth from '@shared/hooks/useAuth';
import { getTransactions as queryTransaction } from '@slices/indexerSlice';

export default () => {
  const dispatch = useAppDispatch();
  const { setTitle } = usePageTitle();
  const { isSelect } = useSelectData();
  const auth = useAuth();
  const { userInfo, updateActions, allUsers } = useAppSelector(
    (app) => app.profile
  );
  const { getTransactions } = useAppSelector(
    (app) => app.indexer
  );
  const { inputs, handleOnChange } = useOnChange({
    username: userInfo?.username || '',
    address: auth?.address,
    bio: userInfo?.bio || '',
    email: userInfo?.email || '',
    link: userInfo?.link || '',
  });

  useEffect(() => {
    if (isSelect) {
      setTitle('Select user');
    } else {
      setTitle('Profile');
    }
  }, [isSelect]);

  useEffect(() => {
    dispatch(getUserInfo(auth?.address));
    dispatch(getAllUsers());
    dispatch(queryTransaction({ user: 'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7' }));
  }, [updateActions.success]);

  useEffect(() => {
    // IT WORKS :P: console.log(getTransactions.transactions)
  }, [getTransactions.success]);

  const handleUpdateProfile = () => {
    dispatch(updateUserInfo(inputs));
  };

  return {
    isSelectUser: isSelect,
    inputs,
    handleOnChange,
    handleUpdateProfile,
    isLoading: updateActions.isLoading,
    allUsers,
  };
};
