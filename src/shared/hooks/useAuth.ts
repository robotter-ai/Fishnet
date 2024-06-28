import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WalletName } from '@solana/wallet-adapter-base';
import { useAuth } from '@contexts/auth-provider';

const useWalletAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { disconnect, select } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const { tokenValidated, removeToken } = useAuth();
  
  useEffect(() => {
    if (tokenValidated) {
      setIsLoading(false);
      if (location.pathname === '/') navigate('/data', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [tokenValidated]);

  const handleConnect = async (wallet: WalletName | null) => {
    try {
      select(wallet);
      setIsLoading(true);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect().then(() => {
      removeToken();
    });
  };

  return {
    isLoading,
    handleConnect,
    handleDisconnect,
  };
};

export default useWalletAuth;
