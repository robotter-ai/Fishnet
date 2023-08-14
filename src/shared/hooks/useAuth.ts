import { useAccount, useEnsName } from 'wagmi';

interface AuthProps {
  address: string;
  wallet: string;
  isConnected: boolean;
}

export default (): AuthProps => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return { address: (ensName ?? address) as string, isConnected, wallet: '' };
};
