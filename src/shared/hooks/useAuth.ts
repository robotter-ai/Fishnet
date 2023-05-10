import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

export default (): { address: any; isConnected: boolean } => {
  const { isConnected, address } = useAccount();
  const { connected, publicKey } = useWallet();

  const auth = JSON.parse(localStorage.getItem('auth') as string);

  useEffect(() => {
    if (address || publicKey?.toBase58()) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          address: address || publicKey?.toBase58(),
          isConnected: isConnected || connected,
        })
      );
    }
  }, [address, publicKey?.toBase58()]);

  return auth;
};
