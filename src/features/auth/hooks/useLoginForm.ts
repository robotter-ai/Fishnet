import { PhantomConnector } from 'phantom-wagmi-connector';
import { useNavigate } from 'react-router-dom';
import { useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { toast } from 'react-toastify';
import type { WalletProps } from '../components/LoginForm';

export default () => {
  const navigate = useNavigate();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnectWallet = (connectors: WalletProps) => {
    if (connectors === 'Metamask') {
      if (!window.ethereum) {
        toast.error('MetaMask is not available... Please install');
        return;
      }
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
