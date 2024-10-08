import { robotterApi } from '@store/config';
import { InstancesProp, InstancesResp } from './types';

const instanceApi = robotterApi.injectEndpoints({
  endpoints: (builder) => ({
    createInstance: builder.mutation<InstancesResp, InstancesProp>({
      query: (data) => ({
        method: 'POST',
        url: '/instances',
        data,
      }),
      invalidatesTags: ['Instance'],
    }),

    getInstance: builder.query<string, { instance_id: string }>({
      query: ({ instance_id }) => ({
        method: 'GET',
        url: `/instances/${instance_id}/wallet`,
      }),
      providesTags: ['Instance'],
    }),

    startInstance: builder.mutation<string, { instance_id: string }>({
      query: ({ instance_id }) => ({
        method: 'POST',
        url: `/instances/${instance_id}/start`,
      }),
      invalidatesTags: ['StartInstance'],
    }),

    stopInstance: builder.mutation<string, { instance_id: string }>({
      query: ({ instance_id }) => ({
        method: 'POST',
        url: `/instances/${instance_id}/stop`
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
