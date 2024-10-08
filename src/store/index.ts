import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { rootReducer } from './reducers';

import { robotterApi, transactionsApi } from './config';
import { websocketMiddleware } from './wsApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(robotterApi.middleware, transactionsApi.middleware).concat(websocketMiddleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;