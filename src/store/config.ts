import Cookies from 'universal-cookie';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const FISHNET_API_URL = import.meta.env.VITE_FISHNET_API_URL;
export const TRANSACTIONS_API_URL = import.meta.env.VITE_TRANSACTIONS_API_URL;
// export const FISHNET_MARKETPLACE_AUTH =
//   'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7';
// export const FISHNET_MARKETPLACE =
//   '5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG';
// export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
// export const SOLANA_CONNECTION = new Connection(import.meta.env.VITE_RPC);

export const cookies = new Cookies();

const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = cookies.get('bearerToken');

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: { Authorization: `Bearer ${token}`, ...headers },
      });

      return { data: result?.data ? result.data : null };
    } catch (error) {
      const err = error as AxiosError;

      if (err?.response?.status === 401) {
        // OR 403
        toast.error('Session expired. Please connect again.');
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const globalApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: FISHNET_API_URL,
  }),
  refetchOnReconnect: true,
  tagTypes: ['Dataset', 'Timeseries', 'UserInfo', 'View'],
  endpoints: () => ({}),
});
