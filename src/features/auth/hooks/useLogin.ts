import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useNavigate } from 'react-router-dom';
import {  useDisconnect } from 'wagmi';

export type WalletNameTypes = 'Phantom' | 'Metamask' | 'Solana';

export default () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { connect, select, wallets } = useWallet();

  const getSerializedSignature = async (signMessage: (message: Uint8Array) => Promise<Uint8Array>, data: Uint8Array): Promise<string> => {
    const signature = await signMessage(data);
    return bs58.encode(signature);
  };

  const signChallenge = async (
    challenge: string,
    signMessage: (message: Uint8Array) => Promise<Uint8Array>,
  ) => {
    const messageData = new TextEncoder().encode(challenge);
    return await getSerializedSignature(signMessage, messageData);
  };

  const handleLogin = async (name: WalletNameTypes) => {
    if (name === 'Phantom') {
      select(wallets[0].adapter.name)
    }
    connect();
    //localStorage.setItem('wallet.connected.name', name.toString());
  };

  const handleDisconnectWallet = () => {
    navigate(0);
    disconnect();
    localStorage.clear();
  };

  return { handleLogin, handleDisconnectWallet, signChallenge };
};
