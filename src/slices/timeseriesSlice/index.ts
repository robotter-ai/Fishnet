import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getErrMsg from '@shared/utils/getErrMsg';
import axios from 'axios';
import { toast } from 'react-toastify';

export const preprocessTimeseries = createAsyncThunk(
  'timeseries/preprocessTimeseries',
  async (formData: any, thunkAPI) => {
    try {
      const { data } = await axios.post('/timeseries/csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
        state.timeseries = action.payload.map((item: any) => ({
          // item_hash: item.item_hash,
          name: item.name,
          owner: item.owner,
          desc: item.desc,
          data: item.data,
        }));
      })
      .addCase(preprocessTimeseries.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetTimeseriesActions, setCsvJson } = timeseriesSlice.actions;

export default timeseriesSlice;
