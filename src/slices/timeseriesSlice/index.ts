import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getErrMsg from '@shared/utils/getErrMsg';
import axios from 'axios';
import { toast } from 'sonner';
import { FISHNET_API_URL, cookies } from '@store/config';

export const preprocessTimeseries = createAsyncThunk(
  'timeseries/preprocessTimeseries',
  async (formData: any, thunkAPI) => {
    try {
      const bearerToken = cookies.get('bearerToken');
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${bearerToken}`
      };
      const { data } = await axios.post(
        `${FISHNET_API_URL}/timeseries/csv`,
        formData,
        {
          headers,
        }
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

interface TimeseriesProps {
  isLoading: boolean;
  success: boolean | null;
  timeseries: any;
  csvJson: any[];
}

const initialState: TimeseriesProps = {
  isLoading: false,
  success: null,
  timeseries: [],
  csvJson: [],
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