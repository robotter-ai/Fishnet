/* eslint-disable import/no-absolute-path */
import { useEffect } from 'react';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import { LoginForm } from '@features/auth';
import useAuth from '@shared/hooks/useAuth';
import useModal from '@shared/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  getChallenge as getChallengeRequest,
  resetChallengeDetails,
  solveChallenge as solveChallengeRequest,
} from '@slices/authSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import Cookies from 'universal-cookie';
import useLogin from '@features/auth/hooks/useLogin';
import LoginWaveImg from '@assets/images/login-wave.png';

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
    if (
      auth.address &&
      !auth.isAuth &&
      !getChallenge.success
    ) {
      // added isAuth check prevent repeated challenge solving
      dispatch(getChallengeRequest(auth.address));
    }
  }, [auth.walletConnected]);

  const solveChallengeAsync = async () => {
    if (
      signMessage &&
      getChallenge.success &&
      getChallenge.challenge &&
      auth.address &&
      !auth.isAuth
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
  }, [getChallenge.success, ]);

  useEffect(() => {
    if (
      solveChallenge.success &&
      solveChallenge.token &&
      solveChallenge.valid_til
    ) {
      cookies.set('bearerToken', solveChallenge.token, {
        path: '/',
        maxAge: solveChallenge.valid_til,
        secure: true,
      });
      dispatch(resetChallengeDetails());
      navigate('/data', { replace: true });
    }
  }, [solveChallenge.success]);

  return auth.isAuth ? (
    <Navigate to="/data" replace />
  ) : (
    <>
      <div className="flex flex-col h-[100vh] bg-white">
        <div className="py-5 px-8 flex justify-between items-center">
          <img src="./fishnet.png" alt="Fishnet Logo" width={50} />
          <Button
            text="Connect Fishnet"
            icon="login"
            btnStyle="outline-primary"
            onClick={handleOpen}
          />
        </div>
        <div className="relative h-full mt-20 flex flex-col">
          <img
            src="./fishnet-logo.png"
            alt="Fishnet Logo"
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1/2"
          />
          <img
            src={LoginWaveImg}
            alt="Fishnet Logo"
            className="w-full h-full"
          />
          <div className="bg-[#F6FAFB] text-center flex flex-col justify-center py-[10px] px-[25%]">
            <p className="text-2xl">
              Fishnet is currently in alpha! <br/>
              This app is only for demonstration purposes. Do not upload any sensitive data.
            </p>
          </div>
        </div>
      </div>
      <AppModal
        title="Connect a wallet"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <LoginForm />
      </AppModal>
    </>
  );
};

export default Login;
