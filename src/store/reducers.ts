import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import { robotterApi, transactionsApi } from './config';

export const rootReducer = combineReducers({
  app: appSlice.reducer,

  // RTK Query Setup
  [robotterApi.reducerPath]: robotterApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
});