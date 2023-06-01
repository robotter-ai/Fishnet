import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { RootState } from 'src/store';
import dataService from './dataService';

export const getDatasets = createAsyncThunk(
  'datasets/getDatasets',
  async (address: string, thunkAPI) => {
    try {
      return await dataService.getDatasets(address);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getPublishedDatasets = createAsyncThunk(
  'datasets/getPublishedDatasets',
  async (address: string, thunkAPI) => {
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

export const getDatasetByID = createAsyncThunk(
  'datasets/getDatasetByID',
  async (params: { id: string; view_as: string }, thunkAPI) => {
    try {
      return await dataService.getDatasetByID(params.id, params.view_as);
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
          ...datasets.dataDetails,
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

interface DataProps {
  isLoading: boolean;
  success: boolean | null;
  datasets: Record<string, any>[] | any;
  dataDetails: any;
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
}

const initialState: DataProps = {
  isLoading: false,
  success: null,
  datasets: null,
  dataDetails: null,
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
      state.uploadDatasetActions.success = null;
    },
    changeDataDetails: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      state.dataDetails = {
        ...state.dataDetails,
        [action.payload.name]: action.payload.value,
      };
    },
    resetDataDetails: (state) => {
      state.dataDetails = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDatasets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDatasets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.datasets = action.payload;
      })
      .addCase(getDatasets.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })

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

      .addCase(getDatasetByID.pending, (state) => {
        state.datasetByIDActions.isLoading = true;
      })
      .addCase(getDatasetByID.fulfilled, (state, action) => {
        state.datasetByIDActions.isLoading = false;
        state.datasetByIDActions.success = true;
        state.dataDetails = action.payload;
      })
      .addCase(getDatasetByID.rejected, (state, action) => {
        state.datasetByIDActions.isLoading = false;
        toast.error(action.payload as string);
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

      .addCase(uploadDataset.pending, (state) => {
        state.uploadDatasetActions.isLoading = true;
      })
      .addCase(uploadDataset.fulfilled, (state, action) => {
        state.uploadDatasetActions.isLoading = false;
        state.uploadDatasetActions.success = true;
        state.dataDetails = action.payload.dataset;
      })
      .addCase(uploadDataset.rejected, (state, action) => {
        state.uploadDatasetActions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetDataSlice, resetDataDetails, changeDataDetails } =
  dataSlice.actions;

export default dataSlice;
