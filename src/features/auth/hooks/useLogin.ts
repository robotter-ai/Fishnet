import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const { connect, wallet, disconnect } = useWallet();

  const getSerializedSignature = async (
    signMessage: (message: Uint8Array) => Promise<Uint8Array>,
    data: Uint8Array
  ): Promise<string> => {
    const signature = await signMessage(data);
    return bs58.encode(signature);
  };

  const signChallenge = async (
    challenge: string,
    signMessage: (message: Uint8Array) => Promise<Uint8Array>
  ) => {
    const messageData = new TextEncoder().encode(challenge);
    // eslint-disable-next-line @typescript-eslint/return-await
    return await getSerializedSignature(signMessage, messageData);
  };

  const handleConnectWallet = () => {
    try {
      connect();
    } catch (e) {
      console.log(e);
    } finally {
      localStorage.setItem(
        'wallet.connected.name',
        wallet?.adapter.name.toString() || 'Solana'
      );
    }
  };

  const handleDisconnectWallet = () => {
    navigate(0);
    disconnect();
    localStorage.clear();
  };

  return { handleConnectWallet, handleDisconnectWallet, signChallenge };
};
