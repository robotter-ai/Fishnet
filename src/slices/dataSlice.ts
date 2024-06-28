import { globalApi } from '@store/config';

interface IGetDataset {
  type: 'browse-data' | 'published';
  address: string;
}

interface IGenerateViews {
  datasetID: string;
  data: any;
}

export interface IDataset {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  price: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
  downloads?: number[]
}

export interface IUpdateDatasetAvailability {
  datasetID: string;
  available: boolean;
}

type IDatasetTimeseries = { dataset: IDataset; timeseries: any[] };

const getDatasetUrlMap = (
  address: string
): Record<IGetDataset['type'], string> => ({
  published: `?by=${address}`,
  'browse-data': `?view_as=${address}`,
});

const dataApiSlice = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getDatasets: builder.query<any, IGetDataset>({
      query: ({ type, address }) => ({
        method: 'GET',
        url: `/datasets${getDatasetUrlMap(address)[type]}`,
      }),
      providesTags: (result) => [
        ...result?.map(({ item_hash }: any) => ({
          type: 'Dataset',
          id: item_hash,
        })),
      ],
    }),
    getDataset: builder.query<any, { datasetID: string; view_as: string }>({
      query: ({ datasetID, view_as }) => ({
        method: 'GET',
        url: `/datasets/${datasetID}?view_as=${view_as}`,
      }),
      providesTags: (result, error, { datasetID }) => [
        { type: 'Dataset', id: datasetID },
      ],
    }),
    uploadDataset: builder.mutation<any, IDatasetTimeseries>({
      query: (req) => ({
        method: 'POST',
        url: '/datasets/upload/timeseries',
        data: req,
      }),
      invalidatesTags: (result, error, req) => [
        { type: 'Dataset' },
        { type: 'Timeseries' },
      ],
    }),
    updateDataset: builder.mutation<any, IDataset>({
      query: (req) => ({
        method: 'PUT',
        url: '/datasets',
        data: req,
      }),
      invalidatesTags: (result, error, req) => [
        { type: 'Dataset', id: req.item_hash },
      ],
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
    getDatasetData: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/timeseries/json`,
      }),
      providesTags: (result, error, datasetID) => [
        { type: 'Dataset', id: datasetID },
      ],
    }),
    downloadDatasetCsv: builder.query<any, string>({
      query: (datasetID) => ({
        method: 'GET',
        url: `/datasets/${datasetID}/timeseries/csv`,
        // responseHandler: 'text',
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
  }),
});

export const {
  useGetViewsQuery,
  useGetDatasetsQuery,
  useGetDatasetQuery,
  useUploadDatasetMutation,
  useGenerateViewsMutation,
  useUpdateDatasetMutation,
  useGetDatasetTimeseriesQuery,
  useGetDatasetDataQuery,
  useDownloadDatasetCsvQuery,
  useUpdateDatasetAvailabilityMutation,
  useLazyDownloadDatasetCsvQuery,
} = dataApiSlice;
