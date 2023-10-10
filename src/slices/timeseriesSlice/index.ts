import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getErrMsg from '@shared/utils/getErrMsg';
import {
  FISHNET_API_URL,
  getConfig,
  getFormConfig,
} from '@slices/requestConfig';
import axios from 'axios';
import { toast } from 'sonner';

export const preprocessTimeseries = createAsyncThunk(
  'timeseries/preprocessTimeseries',
  async (formData: any, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${FISHNET_API_URL}/timeseries/csv`,
        formData,
        getFormConfig()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export type DownloadTimeseries = {
  timeseriesIDs: string[];
  compression: boolean;
};

export const downloadTimeseries = createAsyncThunk(
  'timeseries/downloadTimeseries',
  async (timeseriesIDs: string[], thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${FISHNET_API_URL}/timeseries/csv/download`,
        timeseriesIDs,
        getConfig()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

interface TimeseriesProps {
  isLoading: boolean;
  success: boolean | null;
  timeseries: any;
  csvJson: any[];
  downloadTimeseries: {
    timeseries: any | null;
    isLoading: boolean;
    success: boolean | null;
  };
}

const initialState: TimeseriesProps = {
  isLoading: false,
  success: null,
  timeseries: [],
  csvJson: [],
  downloadTimeseries: { timeseries: null, isLoading: false, success: null },
};

export const timeseriesSlice = createSlice({
  name: 'timeseries',
  initialState,
  reducers: {
    setCsvJson: (state, action) => {
      state.csvJson = action.payload;
    },
    resetTimeseriesActions: (state) => {
      state.success = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(downloadTimeseries.pending, (state) => {
        state.downloadTimeseries.isLoading = true;
      })
      .addCase(downloadTimeseries.fulfilled, (state, action) => {
        state.downloadTimeseries.isLoading = false;
        state.downloadTimeseries.success = true;
        state.downloadTimeseries.timeseries = action.payload;
      })
      .addCase(downloadTimeseries.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(preprocessTimeseries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(preprocessTimeseries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.timeseries = action.payload;
      })
      .addCase(preprocessTimeseries.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetTimeseriesActions, setCsvJson } = timeseriesSlice.actions;

export default timeseriesSlice;
