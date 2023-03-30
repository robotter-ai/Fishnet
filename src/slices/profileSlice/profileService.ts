import axios from 'axios';

export type UserProps = {
  username: string;
  address: string;
  bio: string;
  email: string;
  link: string;
};

const getUserInfo = async (address: string) => {
  const { data } = await axios.get(`/user/${address}`);
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get('/allusers');
  return data;
};

const updateUserInfo = async (userDetails: UserProps) => {
  const { data } = await axios.put('/user', userDetails);
  return data;
};

const profileService = {
  getUserInfo,
  getAllUsers,
  updateUserInfo,
};

export default profileService;
