import { getHeaders, FISHNET_API_URL } from '@slices/requestConfig';
import axios from 'axios';

const challenge = async (address: string, chain: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/challenge?address=${address}&chain=${chain}`,
    getHeaders(false)
  );
  return data;
};

const solve = async (address: string, signature: string, chain: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/solve?address=${address}&chain=${chain}&signature=${signature}`,
    getHeaders(false)
  );
  return data;
};

const refresh = async (token: string) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/authorization/refresh?token=${token}`,
    getHeaders()
  );
  return data;
};

const auth = {
  challenge,
  solve,
  refresh,
};

export default auth;
