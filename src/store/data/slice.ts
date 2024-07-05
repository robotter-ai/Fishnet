import { createSlice } from '@reduxjs/toolkit';
import { IChartProps } from './types';

interface InitialStateProps {
  timeseries: Record<string, any>[];
  charts: IChartProps[];
}

const initialState: InitialStateProps = {
  timeseries: [],
  charts: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setTimeseries: (state, action) => {
      state.timeseries = action.payload;
    },
    setCharts: (state, action) => {
      state.charts = action.payload;
    },
  },
});

export const { setTimeseries, setCharts } = dataSlice.actions;

export default dataSlice;
