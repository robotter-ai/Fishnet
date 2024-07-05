import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import transactionSlice from '@slices/transactionSlice';
import { globalApi } from './config';
import monitorAccessSlice from './monitor-access/slice';
import dataSlice from './data/slice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  data: dataSlice.reducer,
  transactions: transactionSlice.reducer,
  monitorAccess: monitorAccessSlice.reducer,

  // RTK Query Setup
  [globalApi.reducerPath]: globalApi.reducer,
});
