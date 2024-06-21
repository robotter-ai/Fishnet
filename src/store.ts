import { configureStore } from '@reduxjs/toolkit';
import appSlice from '@slices/appSlice';
import authSlice from '@slices/authSlice';
import monitorAccessSlice from '@slices/monitorAccessSlice';
import profileSlice from '@slices/profileSlice';
import timeseriesSlice from '@slices/timeseriesSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { fishnetApi } from '@slices/fishnetApi';
import transactionsSlice from '@slices/transactionsSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    transactions: transactionsSlice.reducer,
    timeseries: timeseriesSlice.reducer,
    monitorAccess: monitorAccessSlice.reducer,
    profile: profileSlice.reducer,

    // RTK Query Setup
    [fishnetApi.reducerPath]: fishnetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(fishnetApi.middleware), // API middleware enables caching, invalidation, polling, and other useful features of rtk-query.,
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
