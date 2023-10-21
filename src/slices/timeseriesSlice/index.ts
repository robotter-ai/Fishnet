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

export const downloadTimeseriesCsv = createAsyncThunk(
  'timeseries/downloadTimeseries',
  async (timeseriesIDs: string[], thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${FISHNET_API_URL}/timeseries/csv?timeseriesIDs=${timeseriesIDs.join(',')}`,
        getConfig()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const downloadTimeseriesJson = createAsyncThunk(
  'timeseries/downloadTimeseriesJson',
  async (timeseriesIDs: string[], thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${FISHNET_API_URL}/timeseries/json?timeseriesIDs=${timeseriesIDs.join(',')}`,
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
  downloadTimeseriesJson: {
    timeseries: any | null;
    isLoading: boolean;
    success: boolean | null;
  }
}

const initialState: TimeseriesProps = {
  isLoading: false,
  success: null,
  timeseries: [],
  csvJson: [],
  downloadTimeseries: { timeseries: null, isLoading: false, success: null },
  downloadTimeseriesJson: { timeseries: null, isLoading: false, success: null },
};

export const timeseriesSlice = createSlice({
  name: 'timeseries',
  initialState,
  reducers: {
    setCsvJson: (state, action) => {
      state.csvJson = action.payload;
    },
    setTimeseries: (state, action) => {
      state.timeseries = action.payload;

      state.csvJson = [];
      if (state.timeseries.length === 0) {
        return;
      }
      for (let i = 0; i < state.timeseries[0].data.length; i++) {
        const date = state.timeseries[0].data[i][0] * 1000; // convert to ms
        const data = state.timeseries.map((item: any) => {
          return {
            [item.name]: item.data[i][1],
          }
        }).reduce((acc: any, curr: any) => {
          return { ...acc, ...curr };
        });
        state.csvJson.push({
          date,
          ...data,
        });
      }
    },
    resetTimeseriesActions: (state) => {
      state.success = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(downloadTimeseriesCsv.pending, (state) => {
        state.downloadTimeseries.isLoading = true;
        toast.loading('Downloading CSV...');
      })
      .addCase(downloadTimeseriesCsv.fulfilled, (state, action) => {
        state.downloadTimeseries.isLoading = false;
        state.downloadTimeseries.success = true;
        state.downloadTimeseries.timeseries = action.payload;
        toast.success('CSV ready!');
      })
      .addCase(downloadTimeseriesCsv.rejected, (state, action) => {
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

export const { resetTimeseriesActions, setCsvJson, setTimeseries } = timeseriesSlice.actions;

export default timeseriesSlice;
