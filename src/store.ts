import { configureStore } from '@reduxjs/toolkit';
import appSlice from '@shared/slices/appSlice';
import dataSlice from '@features/data/slices/dataSlice';
import userSlice from '@features/auth/slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    datasets: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
