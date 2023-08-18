import { config } from '@slices/requestConfig';
import axios from 'axios';

export type UserProps = {
  username: string;
  address: string;
  bio: string;
  email: string;
  link: string;
};

const getUserInfo = async (address: string) => {
  const { data } = await axios.get(`/users/${address}`, config);
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get('/users', config);
  return data;
};

const updateUserInfo = async (userDetails: UserProps) => {
  const { data } = await axios.put('/users', userDetails, config);
  return data;
};

const getNotifications = async (address: string) => {
  const { data } = await axios.get(`/users/${address}/notifications`, config);
  return data;
};

const profileService = {
  getUserInfo,
  getAllUsers,
  updateUserInfo,
  getNotifications,
};

export default profileService;
