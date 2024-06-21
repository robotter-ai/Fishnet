import Cookies from 'universal-cookie';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const FISHNET_API_URL = import.meta.env.VITE_FISHNET_API_URL;
export const INDEXER_API_URL = import.meta.env.VITE_INDEXER_API_URL;
export const TRANSACTIONS_API_URL = import.meta.env.VITE_TRANSACTIONS_API_URL;

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
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err?.response?.status === 401) {
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
