import { PhantomConnector } from 'phantom-wagmi-connector';
import { useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import type { WalletProps } from '../components/LoginForm';

export default () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnectWallet = (connectors: WalletProps) => {
    if (connectors === 'Metamask') {
      connect({
        connector: new MetaMaskConnector(),
      });
    } else {
      connect({
        connector: new PhantomConnector(),
      });
    }
  };

  const handleDisconnectWallet = () => disconnect();

  return { handleConnectWallet, handleDisconnectWallet };
};
