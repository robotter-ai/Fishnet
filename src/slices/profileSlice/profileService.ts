import axios from 'axios';

export type UserProps = {
  username: string;
  address: string;
  bio: string;
  email: string;
  link: string;
};

const getUserInfo = async (address: string) => {
  const { data } = await axios.get(`/users/${address}`);
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
};

const updateUserInfo = async (userDetails: UserProps) => {
  const { data } = await axios.put('/users', userDetails);
  return data;
};

const profileService = {
  getUserInfo,
  getAllUsers,
  updateUserInfo,
};

export default profileService;
