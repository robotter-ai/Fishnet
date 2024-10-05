import { robotterApi } from '@store/config';

const CHAIN = 'SOL';

const authApi = robotterApi.injectEndpoints({
  endpoints: (builder) => ({
    requestChallenge: builder.mutation<
      {
        address: string;
        chain: string;
        valid_til: number;
        challenge: string;
      },
      { address: string }
    >({
      query: ({ address }) => ({
        method: 'POST',
        url: `/authorization/challenge?address=${address}&chain=${CHAIN}`,
      }),
    }),

    solveChallenge: builder.mutation<
      {
        address: string;
        chain: string;
        valid_til: number;
        token: string;
      },
      { address: string; signature: string }
    >({
      query: ({ address, signature }) => ({
        method: 'POST',
        url: `/authorization/solve?address=${address}&chain=${CHAIN}&signature=${signature}`,
      }),
    }),

    refreshToken: builder.mutation<
    {
      address: string;
      chain: string;
      valid_til: number;
      token: string;
    },
    { token: string }
    >({
      query: ({ token }) => ({
        method: 'POST',
        url: `/authorization/refresh?token=${token}`,
      }),
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useSolveChallengeMutation,
  useRequestChallengeMutation,
} = authApi;
