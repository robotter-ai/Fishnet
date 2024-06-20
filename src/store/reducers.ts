import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import indexerSlice from '@slices/indexerSlice';
import transactionSlice from '@slices/transactionSlice';
import monitorAccessSlice from '@slices/monitorAccessSlice';
import profileSlice from '@slices/profileSlice';
import timeseriesSlice from '@slices/timeseriesSlice';
import { globalApi } from './config';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  indexer: indexerSlice.reducer,
  transaction: transactionSlice.reducer,
  timeseries: timeseriesSlice.reducer,
  monitorAccess: monitorAccessSlice.reducer,
  profile: profileSlice.reducer,

  // RTK Query Setup
  [globalApi.reducerPath]: globalApi.reducer,
});
