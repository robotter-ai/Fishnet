import React, { createContext, useContext, useMemo, useEffect, ReactNode, useCallback, useState } from 'react';
import { useSolveChallengeMutation, useRequestChallengeMutation } from '@store/auth/api';
import { setLoginStatus, LoginStatus } from '@slices/appSlice';
import { useAppDispatch } from '@shared/hooks/useStore';
import { useWallet } from '@solana/wallet-adapter-react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import LogRocket from 'logrocket';
import bs58 from 'bs58';

interface AuthContextType {
  address: string;
  tokenValidated: boolean;
  removeToken: () => void;
}

interface JwtPayload {
  iss?: string;
  exp?: number;
  sub?: string;
}

const defaultContextValue: AuthContextType = {
  address: '',
  tokenValidated: false,
  removeToken: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const cookies = new Cookies();
  const { publicKey, signMessage } = useWallet();
  const address = useMemo(() => publicKey?.toBase58() || '', [publicKey]);
  const dispatch = useAppDispatch();
  const [solveAuthChallenge] = useSolveChallengeMutation();
  const [requestAuthChallenge] = useRequestChallengeMutation();
  const token = cookies.get("bearerToken");
  const [tokenValidated, setTokenValidated] = useState(!!token);

  useEffect(() => {
    if (!address || token) return;

    requestAuthChallenge({ address })
      .unwrap()
      .then((res) => handleSolveAuthChallenge(res.challenge));
  }, [address, token]);

  const handleSolveAuthChallenge = useCallback(async (challenge: string) => {
    try {
      if (!signMessage) return;

      const message = new TextEncoder().encode(challenge);
      const signedMessage = await signMessage(message);
      const signature = bs58.encode(signedMessage);
      solveAuthChallenge({ address, signature })
        .unwrap()
        .then((res) => {
          const decoded = jwt_decode<JwtPayload>(res.token);
          validateToken(decoded);

          cookies.set('bearerToken', res.token, {
            path: '/',
            maxAge: res.valid_til,
            expires: new Date(res.valid_til),
            secure: true,
          });
        });
    } catch (e) {
      console.error(e);
    }
  }, [signMessage, address, solveAuthChallenge, cookies, dispatch]);

  const validateToken = useCallback((decoded: JwtPayload) => {
    if (!address) return;

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

    setTokenValidated(true);
    LogRocket.identify(address);
  }, [address, cookies, dispatch]);

  const removeToken = () => {
    setTokenValidated(false);
    cookies.remove('bearerToken');
  }

  const contextValue = useMemo(() => ({
    address,
    tokenValidated,
    removeToken
  }), [address, tokenValidated]);

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
