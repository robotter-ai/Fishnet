import { PhantomConnector } from 'phantom-wagmi-connector';
import { useNavigate } from 'react-router-dom';
import { useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export type WalletNameTypes = 'Phantom' | 'Metamask' | 'Solana';

const WALLET_CONNECTORS: Record<WalletNameTypes, any> = {
  Phantom: new PhantomConnector(),
  Solana: new PhantomConnector(),
  Metamask: new MetaMaskConnector(),
};

export default () => {
  const navigate = useNavigate();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleLogin = (name: WalletNameTypes) => {
    localStorage.setItem('wallet.connected.name', name.toString());
    connect({
      connector: WALLET_CONNECTORS[name],
    });
  };

  const handleDisconnectWallet = () => {
    navigate(0);
    disconnect();
    localStorage.clear();
  };

  return { handleLogin, handleDisconnectWallet };
};
