import { useEffect } from 'react';
import { useDisconnect } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const { disconnect: disconnectMetemask } = useDisconnect();
  const { disconnect: disconnectPhantom } = useWallet();

  const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') as string);
  const isConnected = wagmiStore?.state?.data?.account;

  const handleLogout = () => {
    disconnectMetemask();
    disconnectPhantom();
    localStorage.clear();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (!isConnected) {
      localStorage.clear();
      navigate('/', { replace: true });
    }
  }, [isConnected]);

  return { handleLogout };
};
