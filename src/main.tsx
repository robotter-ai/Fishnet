import '@assets/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { store } from './store';
import { router } from './routes';
import SolanaContextProvider from './contexts/solana-provider';

LogRocket.init('jf0bw9/fishnet');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SolanaContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </Provider>
    </SolanaContextProvider>
  </React.StrictMode>
);
