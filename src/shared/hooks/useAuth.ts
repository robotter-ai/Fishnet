import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount, useEnsName } from 'wagmi';
import Cookies from 'universal-cookie';
import {useEffect} from "react";
import jwt_decode, {JwtPayload} from "jwt-decode";
import LogRocket from "logrocket";
import {useNavigate} from "react-router-dom";

interface AuthProps {
  address: string;
  walletConnected: boolean;
  hasValidToken: boolean;
}

// Custom type guard to verify JwtPayload type
function isJwtPayload(object: any): object is JwtPayload {
  return object && typeof object === 'object' && 'iss' in object && 'exp' in object;
}

export default (): AuthProps => {
  const cookies = new Cookies();
  const { address: ethAddress, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address: ethAddress });
  const { connected, publicKey: solAddress } = useWallet();
  const navigate = useNavigate();

  const walletConnected = connected || isConnected;
  const address = (solAddress?.toString() ?? ensName ?? ethAddress) as string
  const hasValidToken = !!cookies.get('bearerToken')

  useEffect(() => {
    const bearerToken = cookies.get('bearerToken');
    if (bearerToken) {
      try {
        // Decode the token without verifying its signature
        const decoded = jwt_decode(bearerToken);

        if (decoded && isJwtPayload(decoded)) {
          // Check issuer
          if (decoded.sub !== address) {
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
          LogRocket.identify(address);
        } else {
          console.warn('Invalid token. Please refresh.');
          cookies.remove('bearerToken');
          navigate('/data', { replace: true });
        }

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else if (walletConnected) {

    }
  }, [walletConnected, address]);

  return {
    address,
    walletConnected,
    hasValidToken,
  };
};
