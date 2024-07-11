import '@assets/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@contexts/auth-provider';
import { store } from './store';
import { router } from './routes';
import SolanaContextProvider from './contexts/solana-provider';

LogRocket.init('jf0bw9/fishnet');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SolanaContextProvider>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              className:
                '!w-fit !py-4 !whitespace-nowrap !px-8 right-1/2 -translate-x-1/2 !rounded-[32px]',
            }}
          />
        </AuthProvider>
      </Provider>
    </SolanaContextProvider>
  </React.StrictMode>
);
