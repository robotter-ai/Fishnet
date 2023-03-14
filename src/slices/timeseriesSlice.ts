import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getErrMsg from '@shared/utils/getErrMsg';
import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadTimeseries = createAsyncThunk(
  'timeseries/uploadTimeseries',
  async (formData: any, thunkAPI) => {
    try {
      const { data } = await axios.post(
        '/timeseries/csv/preprocess',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

interface StateProps {
  isLoading: boolean;
  success: boolean | null;
  timeseries: any;
  csvJson: any[];
}

const initialState: StateProps = {
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
      .addCase(uploadTimeseries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadTimeseries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.timeseries = action.payload.map((item: any) => ({
          name: item.name,
          owner: item.owner,
          data: item.data,
        }));
      })
      .addCase(uploadTimeseries.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetTimeseriesActions, setCsvJson } = timeseriesSlice.actions;

export default timeseriesSlice;
