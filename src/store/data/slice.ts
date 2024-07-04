import { createSlice } from '@reduxjs/toolkit';

interface InitialStateProps {
  timeseries: Record<string, any>[];
}

const initialState: InitialStateProps = {
  timeseries: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setTimeseries: (state, action) => {
      state.timeseries = action.payload;
    },
  },
});

export const { setTimeseries } = dataSlice.actions;

export default dataSlice;
