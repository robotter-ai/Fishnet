import { globalApi } from '@store/config';
import {
  IDataset,
  IDatasetTimeseries,
  IGenerateViews,
  IGetDataset,
  IUpdateDatasetAvailability,
} from './types';

const GET_DATASET_PARAMS_MAPPER = (
  address: string
): Record<IGetDataset['type'], string> => ({
  published: `?by=${address}`,
  'browse-data': `?view_as=${address}`,
});

const dataApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getDatasets: builder.query<any, IGetDataset>({
      query: ({ type, address }) => ({
        method: 'GET',
        url: `/datasets${GET_DATASET_PARAMS_MAPPER(address)[type]}`,
      }),
      // providesTags: (result) => [
      //   ...result?.map(({ item_hash }: any) => ({
      //     type: 'Dataset',
      //     id: item_hash,
      //   })),
      // ],
    }),

    getDatasetById: builder.query<any, { datasetID: string; view_as: string }>({
      query: ({ datasetID, ...params }) => ({
        method: 'GET',
        url: `/datasets/${datasetID}`,
        params,
      }),
      providesTags: (_, __, { datasetID }) => [
        { type: 'Dataset', id: datasetID },
      ],
    }),

    uploadDataset: builder.mutation<any, IDatasetTimeseries>({
      query: (req) => ({
        method: 'POST',
        url: '/datasets/upload/timeseries',
        data: req,
      }),
      invalidatesTags: () => [{ type: 'Dataset' }, { type: 'Timeseries' }],
    }),

    updateDataset: builder.mutation<any, IDataset>({
      query: (req) => ({
        method: 'PUT',
        url: '/datasets',
        data: req,
      }),
      invalidatesTags: (_, __, req) => [{ type: 'Dataset', id: req.item_hash }],
    }),

    updateDatasetAvailability: builder.mutation<
      any,
      IUpdateDatasetAvailability
    >({
      query: (req) => ({
        method: 'PUT',
        url: `/datasets/${req.datasetID}/available/${req.available}`,
      }),
      invalidatesTags: (result, error, req) => [
        { type: 'Dataset', id: req.datasetID },
      ],
    }),

    getViews: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/views`,
      }),
      providesTags: (result, error, datasetID) => [
        { type: 'Dataset', id: datasetID },
      ],
    }),

    generateViews: builder.mutation<any, IGenerateViews>({
      query: ({ datasetID, data }) => ({
        method: 'PUT',
        url: `/datasets/${datasetID}/views`,
        data,
      }),
      invalidatesTags: (result, error, { datasetID }) => [
        { type: 'Dataset', id: datasetID },
      ],
    }),

    downloadDatasetCSV: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/timeseries/csv`,
      }),
      providesTags: (result, error, datasetID) => [
        { type: 'Dataset', id: datasetID },
      ],
      transformResponse: (response) =>
        new Blob([response as string], { type: 'text/csv' }),
    }),

    getDatasetTimeseries: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/timeseries`,
      }),
    }),

    preProcessTimeseries: builder.mutation<void, FormData>({
      query: (data) => ({
        method: 'POST',
        url: '/timeseries/csv',
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      }),
    }),
  }),
});

export const {
  useGetViewsQuery,
  useGetDatasetsQuery,
  useGetDatasetByIdQuery,
  useUploadDatasetMutation,
  useGenerateViewsMutation,
  useUpdateDatasetMutation,
  useDownloadDatasetCSVQuery,
  useGetDatasetTimeseriesQuery,
  useLazyDownloadDatasetCSVQuery,
  usePreProcessTimeseriesMutation,
  useUpdateDatasetAvailabilityMutation,
} = dataApi;
