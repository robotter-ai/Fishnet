import { PhantomConnector } from 'phantom-wagmi-connector';
import { useNavigate } from 'react-router-dom';
import { useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import type { WalletProps } from '../components/LoginForm';

export default () => {
  const navigate = useNavigate();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnectWallet = (connectors: WalletProps) => {
    if (connectors === 'Metamask') {
      connect({
        connector: new MetaMaskConnector(),
      });
    } else {
      connect({
        // @ts-ignore
        connector: new PhantomConnector(),
      });
    }
  };

  const handleDisconnectWallet = () => {
    navigate(0);
    disconnect();
    localStorage.clear();
  };

  return { handleConnectWallet, handleDisconnectWallet };
};
