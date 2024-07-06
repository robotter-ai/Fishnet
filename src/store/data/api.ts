import { globalApi } from '@store/config';
import {
  IDataset,
  IDatasetTimeseries,
  IGenerateViews,
  IUpdateDatasetAvailability,
} from './types';

const dataApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getDatasets: builder.query<IDataset[], { by?: string; view_as?: string }>({
      query: (params) => ({
        method: 'GET',
        url: '/datasets',
        params,
      }),
      providesTags: ['Dataset'],
    }),

    getDatasetById: builder.query<any, { datasetID: string; view_as: string }>({
      query: ({ datasetID, ...params }) => ({
        method: 'GET',
        url: `/datasets/${datasetID}`,
        params,
      }),
      providesTags: ['Dataset'],
    }),

    uploadDataset: builder.mutation<any, IDatasetTimeseries>({
      query: (req) => ({
        method: 'POST',
        url: '/datasets/upload/timeseries',
        data: req,
      }),
      invalidatesTags: ['Dataset', 'Timeseries'],
    }),

    updateDataset: builder.mutation<any, IDataset>({
      query: (req) => ({
        method: 'PUT',
        url: '/datasets',
        data: req,
      }),
      invalidatesTags: ['Dataset'],
    }),

    updateDatasetAvailability: builder.mutation<
      any,
      IUpdateDatasetAvailability
    >({
      query: (req) => ({
        method: 'PUT',
        url: `/datasets/${req.datasetID}/available/${req.available}`,
      }),
      invalidatesTags: ['Dataset'],
    }),

    getViews: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/views`,
      }),
      providesTags: ['Dataset'],
    }),

    generateViews: builder.mutation<any, IGenerateViews>({
      query: ({ datasetID, data }) => ({
        method: 'PUT',
        url: `/datasets/${datasetID}/views`,
        data,
      }),
      invalidatesTags: ['Dataset'],
    }),

    downloadDatasetCSV: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/timeseries/csv`,
      }),
      providesTags: ['Dataset'],
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
