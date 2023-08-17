import './config';
import '@assets/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { store } from './store';
import App from './App';
import { SolanaContextProvider } from './contexts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SolanaContextProvider>
      <Provider store={store}>
        <WagmiConfig config={wagmiConfig}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WagmiConfig>
      </Provider>
    </SolanaContextProvider>
  </React.StrictMode>
);
