import {useWallet} from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import {useNavigate} from 'react-router-dom';

interface LoginProps {
  handleConnectWallet: () => void;
  handleDisconnectWallet: () => void;
  signChallenge: (
    challenge: string,
    signMessage: (message: Uint8Array) => Promise<Uint8Array>
  ) => Promise<string>;
  setLoginStatus: (status: LoginStatus) => void;
  loginStatus: LoginStatus;
  hasEntered: boolean;
  setEntered: (value: boolean) => void;
}

enum LoginStatus {
  IN = 'in',
  OUT = 'out',
  REQUESTED = 'requested',
  PENDING = 'pending',
  SIGNING = 'signing',
}

export default (): LoginProps => {
  const navigate = useNavigate();
  const {connect, wallet, disconnect} = useWallet();

  const loginStatus = sessionStorage.getItem('fishnet.loginStatus') as LoginStatus || LoginStatus.OUT;
  const setLoginStatus = (value: LoginStatus) => {
    sessionStorage.setItem('fishnet.loginStatus', value);
  }

  const hasEntered = sessionStorage.getItem('fishnet.entered') === 'true' || false;
  const setEntered = (value: boolean) => {
    sessionStorage.setItem('fishnet.entered', value.toString());
  }

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
      setLoginStatus(LoginStatus.REQUESTED);
    }
  };

  const handleDisconnectWallet = () => {
    navigate(0);
    disconnect();
    sessionStorage.clear();
  };

  return {
    handleConnectWallet,
    handleDisconnectWallet,
    signChallenge,
    loginStatus,
    setLoginStatus,
    hasEntered,
    setEntered
  };
};

export {LoginStatus};