import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount, useEnsName } from 'wagmi';
import Cookies from 'universal-cookie';

interface AuthProps {
  address: string;
  wallet: string;
  walletConnected: boolean;
  isAuth: boolean
}

export default (): AuthProps => {
  const cookies = new Cookies();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connected, publicKey, wallet } = useWallet();

  const walletConnected = connected || isConnected;

  return {
    address: (publicKey?.toString() ?? ensName ?? address) as string,
    walletConnected,
    wallet: wallet?.adapter.name || '',
    isAuth: !!cookies.get('bearerToken'),
  };
};