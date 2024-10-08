import Cookies from 'universal-cookie';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const ROBOTTER_API_URL = import.meta.env.VITE_ROBOTTER_API_URL;
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
      body?: AxiosRequestConfig['data'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, data, params, headers }) => {
    try {
      const token = cookies.get('bearerToken');

      console.log('Request:', { url, method, body, data, params, headers });

      const result = await axios({
        url: baseUrl + url,
        method,
        data: body || data,
        params,
        headers: { Authorization: `Bearer ${token}`, ...headers },
      });

      console.log('Response:', result);

      return { data: result?.data ? result.data : null };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      console.error('Error:', err.response);

      if (err.response?.status === 401) {
        toast.error('Session expired. Please connect again.');
        cookies.remove('bearerToken');
      } else {
        toast.error(err.message);
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const robotterApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_ROBOTTER_API_URL || 'http://localhost:8000',
  }),
  refetchOnReconnect: true,
  tagTypes: ['Profile', 'Instance', 'StartInstance', 'StopInstance', 'Candle'],
  endpoints: () => ({}),
});

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_TRANSACTIONS_API_URL || 'http://localhost:3000',
  }),
  refetchOnReconnect: true,
  tagTypes: ['Transactions'],
  endpoints: () => ({}),
});