import { FISHNET_API_URL, getHeaders } from '@slices/requestConfig';
import axios from 'axios';

export type UserProps = {
  username: string;
  address: string;
  bio: string;
  email: string;
  link: string;
  downloads?: number;
};

const getUserInfo = async (address: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/users/${address}`,
    getHeaders()
  );
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get(`${FISHNET_API_URL}/users`, getHeaders());
  return data;
};

const updateUserInfo = async (userDetails: UserProps) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/users`,
    userDetails,
    getHeaders()
  );
  return data;
};

const getNotifications = async (address: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/users/${address}/notifications`,
    getHeaders()
  );
  return data;
};

const profileService = {
  getUserInfo,
  getAllUsers,
  updateUserInfo,
  getNotifications,
};

export default profileService;