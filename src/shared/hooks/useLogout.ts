import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisconnect } from 'wagmi';

export default () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  // const { disconnect: disconnectPhantom } = useWallet();

  const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') as string);
  const isConnected = wagmiStore?.state?.data?.account;

  const handleLogout = () => {
    disconnect();
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
