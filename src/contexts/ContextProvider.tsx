import { FC, ReactNode, useCallback, useMemo } from 'react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';

export const SolanaContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(() => [], [network]);

  const onError = useCallback((error: WalletError) => {
    // notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
