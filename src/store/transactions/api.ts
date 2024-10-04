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
    deposit: builder.mutation<
        { transaction: string; botId: number; mangoAccount?: string; status: number; message?: string },
        { body: string }
    >({
        query: (body) => ({
        url: '/deposit',
        method: 'POST',
        body,
        }),
    }),
    withdraw: builder.mutation<{ transaction: string }, { owner: string; botId: number }>({
      query: (body) => ({
        url: '/withdraw',
        method: 'POST',
        body,
      }),
    }),
    sendTransaction: builder.mutation<{ signature: string }, { transaction: string }>({
      query: (body) => ({
        url: '/sendTransaction',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUserUsdcBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
  useSendTransactionMutation,
} = transactionsEndpoints;