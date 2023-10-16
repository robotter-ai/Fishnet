import { FISHNET_API_URL, getConfig } from '@slices/requestConfig';
import axios from 'axios';

export type UserProps = {
  username: string;
  address: string;
  bio: string;
  email: string;
  link: string;
};

const getUserInfo = async (address: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/users/${address}`,
    getConfig()
  );
  return data;
};

const getAllUsers = async () => {
  const { data } = await axios.get(`${FISHNET_API_URL}/users`, getConfig());
  return data;
};

const updateUserInfo = async (userDetails: UserProps) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/users`,
    userDetails,
    getConfig()
  );
  return data;
};

const getNotifications = async (address: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/users/${address}/notifications`,
    getConfig()
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
