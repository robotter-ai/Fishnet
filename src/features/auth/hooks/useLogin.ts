import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomConnector } from 'phantom-wagmi-connector';
import { useNavigate } from 'react-router-dom';
import { useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export type WalletNameTypes = 'Phantom' | 'Metamask' | 'Solana';

const WALLET_CONNECTORS: Record<WalletNameTypes, any> = {
  Phantom: new PhantomConnector(), // useless, eth phantom connector
  Solana: new PhantomConnector(), // useless
  Metamask: new MetaMaskConnector(),
};

export default () => {
  const navigate = useNavigate();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { select, wallets } = useWallet();

  const handleLogin = (name: WalletNameTypes) => {
    if (name === 'Solana') {
      select(wallets[0].adapter.name)
    } else {
      localStorage.setItem('wallet.connected.name', name.toString());
      connect({
        connector: WALLET_CONNECTORS[name],
      });
    }
  };

  const handleDisconnectWallet = () => {
    navigate(0);
    disconnect();
    localStorage.clear();
  };

  return { handleLogin, handleDisconnectWallet };
};
