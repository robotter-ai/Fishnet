import {useWallet} from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {
  getChallenge as getChallengeRequest,
  resetChallengeDetails,
  solveChallenge as solveChallengeRequest
} from "@slices/authSlice";
import { setLoginStatus, LoginStatus } from '@slices/appSlice';
import {useAppDispatch, useAppSelector} from "@shared/hooks/useStore";
import useAuth from "@shared/hooks/useAuth";
import Cookies from "universal-cookie";

interface LoginProps {
  handleConnectWallet: () => void;
  handleDisconnectWallet: () => void;
}

export default (): LoginProps => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getChallenge, solveChallenge } = useAppSelector((app) => app.auth);
  const { loginStatus } = useAppSelector((app) => app.app);

  const {connect, wallet, disconnect, signMessage} = useWallet();
  const { walletConnected, hasValidToken, address } = useAuth();

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
      dispatch(setLoginStatus(LoginStatus.OUT));
    } finally {
      localStorage.setItem(
        'wallet.connected.name',
        wallet?.adapter.name.toString() || 'Solana'
      );
      console.log('handleConnectWallet', address, 'loginStatus', loginStatus, 'hasValidToken', hasValidToken)
      if (address && hasValidToken) {
        dispatch(setLoginStatus(LoginStatus.IN));
      } else {
        dispatch(setLoginStatus(LoginStatus.REQUESTED));
      }
    }
  };

  const handleDisconnectWallet = () => {
    disconnect().then(() => {
      localStorage.removeItem('wallet.connected.name');
      localStorage.removeItem('wallet.connected.status');
      sessionStorage.clear();
      dispatch(setLoginStatus(LoginStatus.OUT));
      navigate('/data', {replace: true});
    });
  };


  useEffect(() => {
    localStorage.setItem('wallet.connected.status', address);
    console.log('getChallengeRequest', address, 'loginStatus', loginStatus, 'hasValidToken', hasValidToken, 'getChallenge.success', getChallenge.success)
      if (
      (loginStatus == LoginStatus.REQUESTED) &&
      address &&
      !hasValidToken &&
      !getChallenge.success
    ) {
      dispatch(setLoginStatus(LoginStatus.PENDING));
      dispatch(getChallengeRequest(address));
      console.log('getChallengeRequest TRIGGERED')
    }
  }, [walletConnected, loginStatus]);

  const solveChallengeAsync = async () => {
    console.log('solveChallengeRequest', address, 'loginStatus', loginStatus, 'hasValidToken', hasValidToken, 'getChallenge.success', getChallenge.success, 'getChallenge.challenge', !!getChallenge.challenge)
      if (
      !hasValidToken &&
      signMessage &&
      getChallenge.success &&
      getChallenge.challenge &&
      address
    ) {
      console.log('solveChallengeRequest TRIGGERED');
      setLoginStatus(LoginStatus.SIGNING);
      try {
        const signature = await signChallenge(
          getChallenge.challenge,
          signMessage
        );
        dispatch(solveChallengeRequest({ address: address, signature }));
      } catch (e) {
        console.log(e);
        dispatch(setLoginStatus(LoginStatus.OUT));
      }
    }
  };

  useEffect(() => {
    if (getChallenge.challenge) {
      solveChallengeAsync();
    }
  }, [getChallenge.success, loginStatus]);

  useEffect(() => {
    if (
      solveChallenge.success &&
      solveChallenge.token &&
      solveChallenge.valid_til
    ) {
      dispatch(setLoginStatus(LoginStatus.IN));
      console.log('resetChallengeDetails TRIGGERED')
      cookies.set('bearerToken', solveChallenge.token, {
        path: '/',
        maxAge: solveChallenge.valid_til,
        expires: new Date(solveChallenge.valid_til),
        secure: true,
      });
      dispatch(resetChallengeDetails());
    }
  }, [walletConnected, solveChallenge.success]);

  return {
    handleConnectWallet,
    handleDisconnectWallet,
  };
};