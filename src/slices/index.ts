import Cookies from 'universal-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FISHNET_API_URL } from './requestConfig';

const cookies = new Cookies();

export const fishnetApi = createApi({
  reducerPath: 'fishnetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: FISHNET_API_URL,
    prepareHeaders: (headers) => {
      const token = cookies.get('bearerToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ['Dataset'],
  endpoints: () => ({}),
});
