import { robotterApi } from '../config';

const robotterEndpoints = robotterApi.injectEndpoints({
    endpoints: (builder) => ({
      createInstance: builder.mutation<
        { instance_id: string; wallet_address: string; market: string },
        { strategy_name: string; strategy_parameters: Record<string, any>; market: string }
      >({
        query: (body) => ({
          url: '/instances',
          method: 'POST',
          body,
        }),
      }),

    getInstanceWallet: builder.query<string, string>({
        query: (instanceId) => ({
          url: `/instances/${instanceId}/wallet`,
          method: 'GET',
        }),
    }),

    startInstance: builder.mutation<
        string,
        { instanceId: string; strategy_name: string; parameters: Record<string, any> }
    >({
        query: ({ instanceId, ...body }) => ({
        url: `/instances/${instanceId}/start`,
        method: 'POST',
        body,
        }),
    }),

    stopInstance: builder.mutation<string, string>({
      query: (instanceId) => ({
        url: `/instances/${instanceId}/stop`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateInstanceMutation,
  useGetInstanceWalletQuery,
  useStartInstanceMutation,
  useStopInstanceMutation,
} = robotterEndpoints;
