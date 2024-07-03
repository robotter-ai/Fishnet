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
import { AuthProvider } from '@contexts/auth-provider';

LogRocket.init('jf0bw9/fishnet');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SolanaContextProvider>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </Provider>
    </SolanaContextProvider>
  </React.StrictMode>
);
