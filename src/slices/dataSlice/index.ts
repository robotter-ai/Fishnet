import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import type { RootState } from 'src/store';
import { fishnetApi } from '..';
import dataService from './dataService';

// START: New API Integration Method (RTK Query)
// TODO: Implement for all Slices
interface IGetDataset {
  type: 'browse-data' | 'published';
  address: string;
}

interface IGenerateViews {
  dataset_id: string;
  data: any;
}

export interface IUploadDataset {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  price: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
}

type IDatasetTimeseries = { dataset: IUploadDataset; timeseries: any[] };

const getDatasetUrlMap = (
  address: string
): Record<IGetDataset['type'], string> => ({
  'published': `?by=${address}`,
  'browse-data': `?view_as=${address}`,
});

const dataApiSlice = fishnetApi.injectEndpoints({
  endpoints: (builder) => ({
    getDatasets: builder.query<any, IGetDataset>({
      query: ({ type, address }) =>
        `/datasets${getDatasetUrlMap(address)[type]}`,
      providesTags: ['Dataset'],
    }),
    getDataset: builder.query<any, { dataset_id: string; view_as: string }>({
      query: ({ dataset_id, view_as }) =>
        `/datasets/${dataset_id}?view_as=${view_as}`,
      providesTags: ['Dataset'],
    }),
    uploadDataset: builder.mutation<any, IDatasetTimeseries>({
      query: (inputs) => ({
        method: 'POST',
        url: '/datasets/upload/timeseries',
        body: inputs,
      }),
      invalidatesTags: ['Dataset'],
    }),
    updateDataset: builder.mutation<any, IUploadDataset>({
      query: (inputs) => ({
        method: 'PUT',
        url: '/datasets',
        body: inputs,
      }),
      invalidatesTags: ['Dataset'],
    }),
    getViews: builder.query<any, string>({
      query: (dataset_id) => `/datasets/${dataset_id}/views`,
    }),
    generateViews: builder.mutation<any, IGenerateViews>({
      query: ({ dataset_id, data }) => ({
        method: 'PUT',
        url: `/datasets/${dataset_id}/views`,
        body: data,
      }),
    }),
    downloadTimeseriesData: builder.mutation<any, string[]>({
      query: (data) => ({
        method: 'POST',
        url: '/timeseries/data/download',
        body: data,
      }),
    }),
    downloadDatasetCsv: builder.mutation<any, string>({
      query: (dataset_id) => ({
        method: 'GET',
        url: `/datasets/${dataset_id}/timeseries/csv`,
      }),
    }),
    getDatasetTimeseries: builder.query<any, string>({
      query: (dataset_id) => `/datasets/${dataset_id}/timeseries`,
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
  useDownloadTimeseriesDataMutation,
  useDownloadDatasetCsvMutation,
} = dataApiSlice;
// END: New API Integration Method

export const getPublishedDatasets = createAsyncThunk(
  'datasets/getPublishedDatasets',
  async (address: string | undefined, thunkAPI) => {
    try {
      return await dataService.getPublishedDatasets(address);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const updateDatasetAvailability = createAsyncThunk(
  'datasets/updateDatasetAvailability',
  async (param: { dataset_id: string; available: boolean }, thunkAPI) => {
    try {
      return await dataService.updateDatasetAvailability(
        param.dataset_id,
        param.available
      );
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const updateDatasets = createAsyncThunk(
  'datasets/updateDatasets',
  async (_, thunkAPI) => {
    try {
      const { datasets, timeseries } = thunkAPI.getState() as RootState;
      const datasetRequest = {
        ...datasets.dataDetails,
        timeseriesIDs: timeseries.timeseries.map((item: any) => item.item_hash),
      };
      return await dataService.updateDatasets(datasetRequest);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const uploadDataset = createAsyncThunk(
  'datasets/uploadDataset',
  async (_, thunkAPI) => {
    try {
      const { datasets, timeseries } = thunkAPI.getState() as RootState;

      const params = {
        dataset: {
          name: datasets.dataDetails.name,
          desc: datasets.dataDetails.desc,
          owner: datasets.dataDetails.owner,
          ownsAllTimeseries: datasets.dataDetails.ownsAllTimeseries,
          price: String(datasets.dataDetails.price),
          timeseriesIDs: [],
        },
        timeseries: timeseries.timeseries,
      };
      return await dataService.uploadDataset(params);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const generateViews = createAsyncThunk(
  'datasets/generateViews',
  async (
    params: {
      datasetId: string;
      request?: {
        timeseriesIDs: string[];
        granularity: string;
        startTime: number;
        endTime: number;
      }[];
    },
    thunkAPI
  ) => {
    try {
      const { datasetId, request } = params;
      const {
        datasets: {
          dataDetails: { timeseriesIDs },
        },
      } = thunkAPI.getState() as RootState;
      return await dataService.generateViews(datasetId, [
        {
          timeseriesIDs,
          startTime: 0,
          endTime: 1686263058,
          granularity: 'DAY',
        },
      ]);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getViews = createAsyncThunk(
  'datasets/getViews',
  async (datasetId: string, thunkAPI) => {
    try {
      return await dataService.getViews(datasetId);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);
interface DataProps {
  isLoading: boolean;
  success: boolean | null;
  datasets: Record<string, any>[] | any;
  dataDetails: any;
  views: any[];
  updatePublicAccess: {
    isLoading: boolean;
    success: boolean | null;
  };
  updateDatasetsActions: {
    isLoading: boolean;
    success: boolean | null;
  };
  datasetByIDActions: {
    isLoading: boolean;
    success: boolean | null;
  };
  publishedDatasets: {
    data: any;
    isLoading: boolean;
    success: boolean | null;
  };
  uploadDatasetActions: {
    isLoading: boolean;
    success: boolean | null;
  };
  generateViewActions: {
    isLoading: boolean;
    success: boolean | null;
  };
  getViewActions: {
    isLoading: boolean;
    success: boolean | null;
  };
}

const initialState: DataProps = {
  isLoading: false,
  success: null,
  datasets: null,
  dataDetails: null,
  views: [],
  updatePublicAccess: {
    isLoading: false,
    success: null,
  },
  updateDatasetsActions: {
    isLoading: false,
    success: null,
  },
  uploadDatasetActions: {
    isLoading: false,
    success: null,
  },
  datasetByIDActions: {
    isLoading: false,
    success: null,
  },
  generateViewActions: {
    isLoading: false,
    success: null,
  },
  getViewActions: {
    isLoading: false,
    success: null,
  },
  publishedDatasets: {
    data: null,
    isLoading: false,
    success: null,
  },
};

const dataSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {
    resetDataSlice: (state) => {
      state.success = null;
      state.updatePublicAccess.success = null;
      state.updateDatasetsActions.success = null;
      state.generateViewActions.success = null;
      state.getViewActions.success = null;
      state.uploadDatasetActions.success = null;
    },
    resetDataDetails: (state) => {
      state.dataDetails = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPublishedDatasets.pending, (state) => {
        state.publishedDatasets.isLoading = true;
      })
      .addCase(getPublishedDatasets.fulfilled, (state, action) => {
        state.publishedDatasets.isLoading = false;
        state.publishedDatasets.success = true;
        state.publishedDatasets.data = action.payload;
      })
      .addCase(getPublishedDatasets.rejected, (state) => {
        state.publishedDatasets.isLoading = false;
      })

      .addCase(updateDatasetAvailability.pending, (state) => {
        state.updatePublicAccess.isLoading = true;
      })
      .addCase(updateDatasetAvailability.fulfilled, (state) => {
        state.updatePublicAccess.isLoading = false;
        state.updatePublicAccess.success = true;
      })
      .addCase(updateDatasetAvailability.rejected, (state, action) => {
        state.updatePublicAccess.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(updateDatasets.pending, (state) => {
        state.updateDatasetsActions.isLoading = true;
      })
      .addCase(updateDatasets.fulfilled, (state, action) => {
        state.updateDatasetsActions.isLoading = false;
        state.updateDatasetsActions.success = true;
        state.dataDetails = action.payload;
      })
      .addCase(updateDatasets.rejected, (state, action) => {
        state.updateDatasetsActions.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(generateViews.pending, (state) => {
        state.generateViewActions.isLoading = true;
      })
      .addCase(generateViews.fulfilled, (state, action) => {
        state.generateViewActions.isLoading = false;
        state.generateViewActions.success = true;
        toast.success(action.payload as string);
        state.views = action.payload.views;
      })
      .addCase(generateViews.rejected, (state, action) => {
        state.generateViewActions.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(getViews.pending, (state) => {
        state.getViewActions.isLoading = true;
      })
      .addCase(getViews.fulfilled, (state, action) => {
        state.getViewActions.isLoading = false;
        state.getViewActions.success = true;
        toast.success(action.payload as string);
        state.views = action.payload.views;
      })
      .addCase(getViews.rejected, (state, action) => {
        state.getViewActions.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(uploadDataset.pending, (state) => {
        state.uploadDatasetActions.isLoading = true;
      })
      .addCase(uploadDataset.fulfilled, (state, action) => {
        state.uploadDatasetActions.isLoading = false;
        state.uploadDatasetActions.success = true;
        state.dataDetails = action.payload.dataset;
        toast.success(action.payload as string);
      })
      .addCase(uploadDataset.rejected, (state, action) => {
        state.uploadDatasetActions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetDataSlice, resetDataDetails } = dataSlice.actions;

export default dataSlice;
