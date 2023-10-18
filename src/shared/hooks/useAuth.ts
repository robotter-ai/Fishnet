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
import useLogin from "@features/auth/hooks/useLogin";
import {useAppDispatch, useAppSelector} from "@shared/hooks/useStore";
import {useNavigate} from "react-router-dom";
import LogRocket from "logrocket";


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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { address: ethAddress, isConnected, isReconnecting } = useAccount();
  const { data: ensName } = useEnsName({ address: ethAddress });
  const { connected, publicKey: solAddress, wallet } = useWallet();
  const { signChallenge } = useLogin();
  const { signMessage } = useWallet();
  const { getChallenge, solveChallenge } = useAppSelector((app) => app.auth);

  const walletConnected = connected || isConnected;
  const usedAddress = (solAddress?.toString() ?? ensName ?? ethAddress) as string
  const hasValidToken = !!cookies.get('bearerToken') && walletConnected

  
  useEffect(() => {
    localStorage.setItem('wallet.connected.status', usedAddress);
    if (usedAddress && !hasValidToken && !getChallenge.success) {
      // added isAuth check prevent repeated challenge solving
      dispatch(getChallengeRequest(usedAddress));
    }
  }, [walletConnected]);

  const solveChallengeAsync = async () => {
    if (
      signMessage &&
      getChallenge.success &&
      getChallenge.challenge &&
      usedAddress &&
      !hasValidToken
    ) {
      const signature = await signChallenge(
        getChallenge.challenge,
        signMessage
      );
      dispatch(solveChallengeRequest({ address: usedAddress, signature }));
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
      cookies.set('bearerToken', solveChallenge.token, {
        path: '/',
        maxAge: solveChallenge.valid_til,
        expires: new Date(solveChallenge.valid_til),
        secure: true,
      });
      dispatch(resetChallengeDetails());
      navigate('/data', { replace: true });
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
  }, [walletConnected, usedAddress, cookies]);

  return {
    address: usedAddress,
    walletConnected,
    wallet: wallet?.adapter.name || '',
    hasValidToken,
  };
};
