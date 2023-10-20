import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount, useEnsName } from 'wagmi';
import Cookies from 'universal-cookie';
import {useEffect} from "react";
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {
  getChallenge as getChallengeRequest,
  resetChallengeDetails,
  solveChallenge as solveChallengeRequest
} from "@slices/authSlice";
import useLogin, {LoginStatus} from "@shared/hooks/useLogin";
import {useAppDispatch, useAppSelector} from "@shared/hooks/useStore";
import LogRocket from "logrocket";
import { useWhatChanged } from "@simbathesailor/use-what-changed"

interface AuthProps {
  address: string;
  wallet: string;
  walletConnected: boolean;
  hasValidToken: boolean;
}

// Custom type guard to verify JwtPayload type
function isJwtPayload(object: any): object is JwtPayload {
  return object && typeof object === 'object' && 'iss' in object && 'exp' in object;
}

export default (): AuthProps => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const { address: ethAddress, isConnected, isReconnecting } = useAccount();
  const { data: ensName } = useEnsName({ address: ethAddress });
  const { connected, publicKey: solAddress, wallet } = useWallet();
  const { signChallenge, setLoginStatus, loginStatus, setEntered, hasEntered } = useLogin();
  const { signMessage } = useWallet();
  const { getChallenge, solveChallenge } = useAppSelector((app) => app.auth);


  const walletConnected = connected || isConnected;
  const usedAddress = (solAddress?.toString() ?? ensName ?? ethAddress) as string
  const hasValidToken = !!cookies.get('bearerToken')

  useWhatChanged([loginStatus]);
  useEffect(() => {
    localStorage.setItem('wallet.connected.status', usedAddress);
    if (
      (!hasEntered || loginStatus === LoginStatus.REQUESTED) &&
      usedAddress &&
      !hasValidToken &&
      !getChallenge.success
    ) {
      setLoginStatus(LoginStatus.PENDING);
      console.log('getChallengeRequest', usedAddress, 'loginStatus', loginStatus, 'hasEntered', hasEntered, 'hasValidToken', hasValidToken, 'getChallenge.success', getChallenge.success)
      dispatch(getChallengeRequest(usedAddress));
    }
  }, [loginStatus]);

  useWhatChanged([getChallenge.success]);
  const solveChallengeAsync = async () => {
    if (
      (!hasEntered || loginStatus === LoginStatus.PENDING) &&
      !hasValidToken &&
      signMessage &&
      getChallenge.success &&
      getChallenge.challenge &&
      usedAddress
    ) {
      setLoginStatus(LoginStatus.SIGNING);
      console.log('solveChallengeRequest', usedAddress, 'loginStatus', loginStatus, 'hasEntered', hasEntered, 'hasValidToken', hasValidToken, 'getChallenge.success', getChallenge.success)
      try {
        const signature = await signChallenge(
          getChallenge.challenge,
          signMessage
        );
        dispatch(solveChallengeRequest({ address: usedAddress, signature }));
      } catch (e) {
        console.log(e);
        setLoginStatus(LoginStatus.OUT);
      }
    }
  };

  useEffect(() => {
    if (getChallenge.challenge) {
      solveChallengeAsync();
    }
  }, [getChallenge.success]);

  useEffect(() => {
    if (
      solveChallenge.success &&
      solveChallenge.token &&
      solveChallenge.valid_til
    ) {
      setLoginStatus(LoginStatus.IN)
      if (!hasEntered) {
        setEntered(true);
      }
      console.log('resetChallengeDetails')
      cookies.set('bearerToken', solveChallenge.token, {
        path: '/',
        maxAge: solveChallenge.valid_til,
        expires: new Date(solveChallenge.valid_til),
        secure: true,
      });
      dispatch(resetChallengeDetails());
    }
  }, [solveChallenge.success]);
  
  useEffect(() => {
    const bearerToken = cookies.get('bearerToken');
    if (bearerToken) {
      try {
        // Decode the token without verifying its signature
        const decoded = jwt_decode(bearerToken);

        if (decoded && isJwtPayload(decoded)) {
          // Check issuer
          if (decoded.sub !== usedAddress) {
            cookies.remove('bearerToken');
          }

          // Refresh token if needed
          if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
            // If the token is expired, you can refresh it here.
            // dispatch(refreshTokenAction()); // Example action to refresh the token
            console.warn('Token expired. Please refresh.');
            console.log('decoded.exp', decoded.exp, 'Date.now()', Date.now());
          }

          // Init logrocket session
          LogRocket.identify(usedAddress);
        } else {
          console.warn('Invalid token. Please refresh.');
          cookies.remove('bearerToken');
        }

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [walletConnected, usedAddress]);

  return {
    address: usedAddress,
    walletConnected,
    wallet: wallet?.adapter.name || '',
    hasValidToken,
  };
};
