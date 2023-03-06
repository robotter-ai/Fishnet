import { useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-wallets';
import type { WalletProps } from '../components/LoginForm';

export default () => {
  const { select } = useWallet();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  const handleConnectWallet = (connectors: WalletProps) => {
    if (connectors === 'Metamask') {
      connect();
    } else {
      select(PhantomWalletName);
    }
  };

  const handleDisconnectWallet = () => disconnect();

  return { handleConnectWallet, handleDisconnectWallet };
};
