import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import transactionSlice from '@slices/transactionSlice';
import profileSlice from '@slices/profileSlice';
import timeseriesSlice from '@slices/timeseriesSlice';
import { globalApi } from './config';
import monitorAccessSlice from './monitor-access/slice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  transactions: transactionSlice.reducer,
  timeseries: timeseriesSlice.reducer,
  monitorAccess: monitorAccessSlice.reducer,
  profile: profileSlice.reducer,

  // RTK Query Setup
  [globalApi.reducerPath]: globalApi.reducer,
});
