import { getConfig, FISHNET_API_URL } from '@slices/requestConfig';
import axios from 'axios';

const challenge = async (address: string, chain: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/challenge?address=${address}&chain=${chain}`,
    getConfig(false)
  );
  return data;
};

const solve = async (address: string, signature: string, chain: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/solve?address=${address}&chain=${chain}&signature=${signature}`,
    getConfig(false)
  );
  return data;
};

const refresh = async (token: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/refresh?token=${token}`,
    getConfig()
  );
  return data;
};

const logout = async (token: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/logout?token=${token}`,
    getConfig()
  );
  return data;
};

const auth = {
  challenge,
  solve,
  refresh,
  logout,
};

export default auth;
