/* eslint-disable import/no-absolute-path */
import { useEffect } from 'react';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import { LoginForm } from '@features/auth';
import useAuth from '@shared/hooks/useAuth';
import useModal from '@shared/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { useNavigate } from 'react-router-dom';
import FishnetLogo from '/fishnet-logo.png';
import { ReactComponent as WaveBg } from '@assets/images/wave.svg';
import {
  getChallenge as getChallengeRequest,
  solveChallenge as solveChallengeRequest,
} from '@slices/authSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import Cookies from 'universal-cookie';
import useLogin from '@features/auth/hooks/useLogin';

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { isOpen, handleOpen, handleClose } = useModal();
  const { signChallenge } = useLogin();
  const { signMessage } = useWallet();
  const { getChallenge, solveChallenge } = useAppSelector((app) => app.auth);

  useEffect(() => {
    localStorage.setItem('wallet.connected.status', auth.address);
    if (auth.address) {
      dispatch(getChallengeRequest(auth.address));
    }
  }, [auth.walletConnected]);

  const solveChallengeAsync = async () => {
    if (
      signMessage &&
      getChallenge.success &&
      getChallenge.challenge &&
      auth.address
    ) {
      const signature = await signChallenge(
        getChallenge.challenge,
        signMessage
      );
      dispatch(solveChallengeRequest({ address: auth.address, signature }));
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
      });
      navigate('/data', { replace: true });
    }
  }, [solveChallenge.success]);

  return (
    <div className="flex flex-col justify-between h-screen bg-white">
      <div className="py-5 px-8 flex justify-between items-center">
        <img src="./fishnet.png" alt="Robotter PNG" width={50} />
        <Button text="Connect a wallet" icon="login" onClick={handleOpen} />
      </div>
      <div className="h-full flex justify-center items-center">
        <img src={FishnetLogo} alt="Robotter PNG" width={1063} />
      </div>
      <WaveBg className="w-full" preserveAspectRatio="none" />
      <AppModal
        title="Connect a wallet"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <LoginForm />
      </AppModal>
    </div>
  );
};

export default Login;
