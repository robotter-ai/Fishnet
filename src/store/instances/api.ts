import { robotterApi } from '@store/config';
import { InstancesProp, InstancesResp } from './types';

const instanceApi = robotterApi.injectEndpoints({
  endpoints: (builder) => ({
    createInstance: builder.mutation<
      { instance_id: string; wallet_address: string; market: string },
      {
        strategy_name: string;
        strategy_parameters: Record<string, any>;
        market: string;
      }
    >({
      query: (data) => {
        console.log('createInstance request body:', data);
        return {
          url: '/instances',
          method: 'POST',
          data,
        };
      },
      invalidatesTags: ['Instance'],
    }),

    getInstance: builder.query<string, { instance_id: string }>({
      query: ({ instance_id }) => ({
        method: 'GET',
        url: `/instances/${instance_id}/wallet`,
      }),
      providesTags: ['Instance'],
    }),

    startInstance: builder.mutation<
      string,
      {
        instanceId: string;
        strategy_name: string;
        parameters: Record<string, any>;
      }
    >({
      query: ({ instanceId, ...data }) => ({
        url: `/instances/${instanceId}/start`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['StartInstance'],
    }),

    stopInstance: builder.mutation<string, { instance_id: string }>({
      query: ({ instance_id }) => ({
        method: 'POST',
        url: `/instances/${instance_id}/stop`,
      }),
      invalidatesTags: ['StopInstance'],
    }),
  }),
});

export const {
  useCreateInstanceMutation,
  useGetInstanceQuery,
  useStartInstanceMutation,
  useStopInstanceMutation,
} = instanceApi;
