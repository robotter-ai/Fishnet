import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useOnChange from '@shared/hooks/useOnChange';
import { getAllUsers, getUserInfo, updateUserInfo } from '@slices/profileSlice';
import useAuth from '@shared/hooks/useAuth';

export default () => {
  const dispatch = useAppDispatch();
  const { setTitle } = usePageTitle();
  const { isSelect } = useSelectData();
  const auth = useAuth();
  const { userInfo, updateActions, allUsers } = useAppSelector(
    (app) => app.profile
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
  }, [updateActions.success]);

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
