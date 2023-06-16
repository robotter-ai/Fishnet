import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

interface AuthProps {
  address: string;
  wallet: string;
  isConnected: boolean;
}

export default (): AuthProps => {
  const { isConnected, address } = useAccount();
  const { connected, publicKey } = useWallet();

  const auth: AuthProps = JSON.parse(
    localStorage.getItem('auth') as string
  ) || {
    address: '',
    wallet: '',
    isConnected: isConnected || connected,
  };

  useEffect(() => {
    if (address || publicKey?.toBase58()) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          address: address || publicKey?.toBase58(),
          wallet: address ? 'metamask' : 'phantom',
          isConnected: isConnected || connected,
        })
      );
    }
  }, [isConnected, connected, address, publicKey?.toBase58()]);

  return auth;
};
