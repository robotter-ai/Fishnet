import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import auth from './auth/slice'
import { robotterApi, transactionsApi } from './config';
import { websocketApi } from './wsApi';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth,

  // RTK Query Setup
  [robotterApi.reducerPath]: robotterApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  [websocketApi.reducerPath]: websocketApi.reducer,
});