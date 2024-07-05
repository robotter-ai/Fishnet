import React, { createContext, useContext, useMemo, useEffect, ReactNode, useCallback, useState } from 'react';
import { useSolveChallengeMutation, useRequestChallengeMutation } from '@store/auth/api';
import { setLoginStatus, LoginStatus } from '@slices/appSlice';
import { getTransactions, resetTransactionsSlice } from '@slices/transactionSlice';
import { useAppDispatch } from '@shared/hooks/useStore';
import { useWallet } from '@solana/wallet-adapter-react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import LogRocket from 'logrocket';
import bs58 from 'bs58';

interface AuthContextType {
  address: string;
  resetAuth: () => void;
}

interface JwtPayload {
  iss?: string;
  exp?: number;
  sub?: string;
}

interface ChallengeResponse {
  address: string;
  chain: string;
  valid_til: number;
  token: string;
}

const defaultContextValue: AuthContextType = {
  address: '',
  resetAuth: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const [solveAuthChallenge] = useSolveChallengeMutation();
  const [requestAuthChallenge] = useRequestChallengeMutation();
  const token = cookies.get("bearerToken");
  const { publicKey, signMessage, disconnect } = useWallet();
  const [address, setAddress] = useState('');

  const validateToken = useCallback((challengeResponse: ChallengeResponse) => {
    if (!publicKey) return;

    const decoded = jwt_decode<JwtPayload>(challengeResponse.token);
    const address = publicKey.toBase58();
    if (decoded.sub !== address) {
      cookies.remove('bearerToken');
      dispatch(setLoginStatus(LoginStatus.OUT));
      return;
    }

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.warn('Token expired. Please refresh.');
      cookies.remove('bearerToken');
      dispatch(setLoginStatus(LoginStatus.OUT));
      return;
    }

    cookies.set('bearerToken', challengeResponse.token, {
      path: '/',
      maxAge: challengeResponse.valid_til,
      expires: new Date(challengeResponse.valid_til),
      secure: true,
    });
    setAddress(address);
    dispatch(getTransactions({ address }));
    LogRocket.identify(address);
  }, [publicKey, cookies, dispatch]);

  const handleChallenge = useCallback(async (challenge: string, address: string) => {
    try {
      if (!signMessage) return;

      const message = new TextEncoder().encode(challenge);
      const signedMessage = await signMessage(message);
      const signature = bs58.encode(signedMessage);

      const challengeResponse = await solveAuthChallenge({ address, signature }).unwrap();
      validateToken(challengeResponse);
    } catch (e) {
      console.error("Failed to solve authentication challenge", e);
    }
  }, [signMessage, validateToken]);

  const handleAuth = useCallback(async (address: string) => {
    if (token) {
      setAddress(address);
      return;
    }

    try {
      const { challenge } = await requestAuthChallenge({ address }).unwrap();
      await handleChallenge(challenge, address);
    } catch (error) {
      console.error("Failed to handle authentication challenge", error);
    }
  }, [token, handleChallenge]);

  useEffect(() => {
    const address = publicKey?.toBase58();
    if (!address) return;

    handleAuth(address);
  }, [publicKey]);

  const resetAuth = useCallback(async () => {
    cookies.remove('bearerToken');
    await disconnect();
    setAddress('');
    dispatch(resetTransactionsSlice);
    dispatch(setLoginStatus(LoginStatus.OUT));
  }, [disconnect, cookies, dispatch]);

  const contextValue = useMemo(() => ({
    address,
    resetAuth
  }), [address, resetAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  
  return context;
}

export { AuthProvider, useAuth };
