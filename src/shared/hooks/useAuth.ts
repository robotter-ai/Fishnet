import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount, useEnsName } from 'wagmi';

interface AuthProps {
  address: string;
  wallet: string;
  isConnected: boolean;
}

export default (): AuthProps => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const { connected, publicKey } = useWallet();
  const connection = connected || isConnected;

  return { address: (publicKey?.toString() ?? ensName ?? address) as string, isConnected: connection, wallet: '' };
};
