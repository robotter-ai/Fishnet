import { IBotData } from '@pages/overview-bots/hooks/useProfile';
import { transactionsApi } from '../config';

const transactionsEndpoints = transactionsApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserUsdcBalance: builder.query<{ balance: number }, { user: string }>({
      query: (params) => ({
        url: '/getUserUsdcBalance',
        method: 'GET',
        params,
      }),
    }),
    getUserBotsAndEvents: builder.query<{ data: IBotData[] }, { userAddress: string }>({
        query: (params) => ({
          url: '/getBotData',
          method: 'GET',
          params,
        }),
    }),
  }),
});

export const {
  useGetUserUsdcBalanceQuery,
  useGetUserBotsAndEventsQuery
} = transactionsEndpoints;