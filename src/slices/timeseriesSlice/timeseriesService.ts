import { createAsyncThunk } from '@reduxjs/toolkit';
import getErrMsg from '@shared/utils/getErrMsg';
import axios from 'axios';

export type TimeseriesProps = {
  id_hash?: string;
  name: string;
  desc?: string;
  owner: string;
  data: [number, number][]; // [timestamp, value]
};

export type UploadTimeseriesProps = {
  timeseries: TimeseriesProps[];
};

export const preprocessTimeseries = createAsyncThunk(
  'timeseries/preprocessTimeseries',
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

const uploadTimeseries = async (timeseries: UploadTimeseriesProps) => {
  const { data } = await axios.put('/timeseries/upload', timeseries);
  return data;
};

const timeseriesService = {
  preprocessTimeseries,
  uploadTimeseries,
};

export default timeseriesService;
