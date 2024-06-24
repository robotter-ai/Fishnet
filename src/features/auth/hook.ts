import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useNavigate } from 'react-router-dom';
import useAuth from '@shared/hooks/useAuth';
import Cookies from 'universal-cookie';
import {
  useRequestChallengeMutation,
  useSolveChallengeMutation,
} from '@store/auth/api';

const useAuthWallet = () => {
  const cookies = new Cookies();

  const navigate = useNavigate();

  const { address } = useAuth();
  const { connect, disconnect, signMessage } = useWallet();

  const [isLoading, setIsLoading] = useState(false);

  const [solveAuthChallenge] = useSolveChallengeMutation();
  const [requestAuthChallenge] = useRequestChallengeMutation();

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      if (address) {
        requestAuthChallenge({ address })
          .unwrap()
          .then((res) => handleSolveAuthChallenge(res.challenge));
      }
    } catch (e) {
      //
    }
  };

  const getSerializedSignature = async (data: Uint8Array): Promise<string> => {
    const signature = await signMessage?.(data);
    return bs58.encode(signature!); // Non-null assertion "!"
  };

  const handleSolveAuthChallenge = async (challenge: string) => {
    try {
      const message = new TextEncoder().encode(challenge);
      const signature = await getSerializedSignature(message);
      solveAuthChallenge({ address, signature })
        .unwrap()
        .then((res) => {
          cookies.set('bearerToken', res.token, {
            path: '/',
            maxAge: res.valid_til,
            expires: new Date(res.valid_til),
            secure: true,
          });
          setIsLoading(false);
          navigate('/data', { replace: true });
        });
    } catch (e) {
      //
    }
  };

  const handleDisconnect = () => {
    disconnect().then(() => {
      sessionStorage.clear();
      cookies.remove('bearerToken');
      navigate('/', { replace: true });
    });
  };

  return {
    isLoading,
    handleConnect,
    handleDisconnect,
  };
};

export default useAuthWallet;
