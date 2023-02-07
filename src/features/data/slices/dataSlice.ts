import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'src/store';
import dataService from './dataService';

export const getDatasets = createAsyncThunk(
  'datasets/getDatasets',
  async (_, thunkAPI) => {
    try {
      const {
        user: { address },
      } = thunkAPI.getState() as RootState;
      return await dataService.getDatasets(address);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      console.log(errMsg);
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

interface DataProps {
  isLoading: boolean;
  success: boolean | null;
  error: any;
  datasets: Record<string, any>[] | any;
}

const initialState: DataProps = {
  isLoading: false,
  success: null,
  error: null,
  datasets: null,
};

const dataSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {},
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
        state.error = action.payload;
      });
  },
});

export default dataSlice;
