import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import {
  useSolveChallengeMutation,
  useRequestChallengeMutation,
  useRefreshTokenMutation,
} from '@store/auth/api';
import { setAddress, setLoginStatus, LoginStatus } from '@store/auth/slice';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useWallet } from '@solana/wallet-adapter-react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import LogRocket from 'logrocket';
import bs58 from 'bs58';
import { useGetWebsocketUpdatesQuery } from '@store/wsApi';

interface AuthContextType {
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
  resetAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const [solveAuthChallenge] = useSolveChallengeMutation();
  const [requestAuthChallenge] = useRequestChallengeMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  const token = cookies.get('bearerToken');
  const { publicKey, signMessage, disconnect } = useWallet();
  const loginStatus = useAppSelector((state) => state.auth.loginStatus);

  useGetWebsocketUpdatesQuery(publicKey?.toBase58() || '', {
    skip: !token || loginStatus !== LoginStatus.IN || !publicKey,
  });

  const resetAuth = useCallback(async () => {
    cookies.remove('bearerToken');
    await disconnect();
    dispatch(setAddress(''));
    dispatch(setLoginStatus(LoginStatus.OUT));
  }, [disconnect, cookies, dispatch]);

  const handleTokenValidation = useCallback(
    async (tokenIn: string, address: string) => {
      try {
        const decoded = jwt_decode<JwtPayload>(tokenIn);
        if (decoded.sub !== address) {
          resetAuth();
          return false;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && currentTime >= decoded.exp) {
          try {
            const refreshedToken = await refreshTokenMutation({
              token,
            }).unwrap();
            const newDecoded = jwt_decode<JwtPayload>(refreshedToken.token);

            if (newDecoded.exp) {
              const maxAge = newDecoded.exp - currentTime;
              cookies.set('bearerToken', refreshedToken.token, {
                path: '/',
                maxAge: maxAge * 1000,
                expires: new Date(newDecoded.exp * 1000),
                secure: true,
                sameSite: 'strict',
              });

              dispatch(setLoginStatus(LoginStatus.IN));
              LogRocket.identify(address);

              return true;
            }
            console.error('New token does not have an expiration');
            await resetAuth();
            return false;
          } catch (error) {
            console.error('Failed to refresh token', error);
            await resetAuth();
            return false;
          }
        }

        cookies.set('bearerToken', tokenIn, {
          path: '/',
          maxAge: decoded.exp ? decoded.exp * 1000 - Date.now() : undefined,
          expires: decoded.exp ? new Date(decoded.exp * 1000) : undefined,
          secure: true,
          sameSite: 'strict',
        });

        dispatch(setAddress(address));
        dispatch(setLoginStatus(LoginStatus.IN));
        LogRocket.identify(address);

        return true;
      } catch (error) {
        console.error('Failed to validate or refresh token', error);
        resetAuth();
        return false;
      }
    },
    [cookies, dispatch, resetAuth, refreshTokenMutation]
  );

  const handleChallenge = useCallback(
    async (challenge: string, address: string) => {
      try {
        if (!signMessage) return;

        const message = new TextEncoder().encode(challenge);
        const signedMessage = await signMessage(message);
        const signature = bs58.encode(signedMessage);

        const challengeResponse = await solveAuthChallenge({
          address,
          signature,
        }).unwrap();
        handleTokenValidation(
          challengeResponse.token,
          challengeResponse.address
        );
      } catch (e) {
        console.error('Failed to solve authentication challenge', e);
        resetAuth();
      }
    },
    [signMessage, handleTokenValidation]
  );

  const handleAuth = useCallback(
    async (address: string) => {
      if (token) {
        try {
          const decoded = jwt_decode<JwtPayload>(token);
          if (decoded.sub !== address) {
            console.error('Token address mismatch');
            const { challenge } = await requestAuthChallenge({
              address,
            }).unwrap();
            await handleChallenge(challenge, address);
            return;
          }

          if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            await handleTokenValidation(token, address);
          } else {
            dispatch(setAddress(address));
            dispatch(setLoginStatus(LoginStatus.IN));
          }
        } catch (error) {
          console.error('Failed to decode token', error);
          resetAuth();
        }
        return;
      }

      try {
        const { challenge } = await requestAuthChallenge({ address }).unwrap();
        await handleChallenge(challenge, address);
      } catch (error) {
        console.error('Failed to handle authentication challenge', error);
        resetAuth();
      }
    },
    [token, handleChallenge, handleTokenValidation, resetAuth, dispatch]
  );

  useEffect(() => {
    const address = publicKey?.toBase58();
    if (!address) return;

    handleAuth(address);
  }, [publicKey]);

  const contextValue = useMemo(
    () => ({
      resetAuth,
    }),
    [resetAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
