import { globalApi } from '@store/config';

const monitorAccessApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomingPermissions: builder.query<any, { address: string }>({
      query: ({ address }) => ({
        method: 'GET',
        url: `/users/${address}/permissions/incoming`,
      }),
      providesTags: ['Permissions'],
    }),

    getOutgoingPermissions: builder.query<any, { address: string }>({
      query: ({ address }) => ({
        method: 'GET',
        url: `/users/${address}/permissions/outgoing`,
      }),
      providesTags: ['Permissions'],
    }),

    getDatasetPermissions: builder.query<any, { dataset_id: string }>({
      query: ({ dataset_id }) => ({
        method: 'GET',
        url: `/datasets/${dataset_id}/permissions`,
      }),
      providesTags: ['Permissions'],
    }),

    requestDatasetPermissions: builder.mutation<
      any,
      { dataset_id: string; timeseriesIDs?: string[] }
    >({
      query: ({ dataset_id, ...data }) => ({
        method: 'PUT',
        url: `/permissions/datasets/${dataset_id}/request`,
        data,
      }),
      invalidatesTags: ['Permissions'],
    }),

    grantDatasetPermissions: builder.mutation<
      any,
      {
        dataset_id: string;
        timeseriesIDs?: string[];
        requestor?: string;
        maxExecutionCount?: number;
      }
    >({
      query: ({ dataset_id, ...data }) => ({
        method: 'PUT',
        url: `/permissions/datasets/${dataset_id}/grant`,
        data,
      }),
      invalidatesTags: ['Permissions'],
    }),

    denyPermissions: builder.mutation<any, { item_hashes: string[] }>({
      query: ({ item_hashes }) => ({
        method: 'PUT',
        url: '/permissions/deny',
        data: item_hashes,
      }),
      invalidatesTags: ['Permissions'],
    }),

    approvePermissions: builder.mutation<any, { item_hashes: string[] }>({
      query: ({ item_hashes }) => ({
        method: 'PUT',
        url: '/permissions/approve',
        data: item_hashes,
      }),
      invalidatesTags: ['Permissions'],
    }),
  }),
});

export const {
  useDenyPermissionsMutation,
  useGetDatasetPermissionsQuery,
  useGetIncomingPermissionsQuery,
  useGetOutgoingPermissionsQuery,
  useGrantDatasetPermissionsMutation,
  useRequestDatasetPermissionsMutation,
} = monitorAccessApi;
