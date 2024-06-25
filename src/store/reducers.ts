import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import monitorAccessSlice from '@slices/monitorAccessSlice';
import profileSlice from '@slices/profileSlice';
import timeseriesSlice from '@slices/timeseriesSlice';
import transactionsSlice from '@slices/transactionsSlice';
import { globalApi } from './config';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  transactions: transactionsSlice.reducer,
  timeseries: timeseriesSlice.reducer,
  monitorAccess: monitorAccessSlice.reducer,
  profile: profileSlice.reducer,

  // RTK Query Setup
  [globalApi.reducerPath]: globalApi.reducer,
});
