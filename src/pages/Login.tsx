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
      dispatch(resetChallengeDetails());
      navigate('/data', { replace: true });
    }
  }, [solveChallenge.success]);

  return auth.isAuth ? (
    <Navigate to="/data" replace />
  ) : (
    <div id="login-wrapper" className="flex flex-col h-screen bg-white">
      <div className="py-5 px-8 flex justify-between items-center">
        <img src="./fishnet.png" alt="Robotter PNG" width={50} />
        <Button text="Connect a wallet" icon="login" onClick={handleOpen} />
      </div>
      <div className="my-auto flex flex-col gap-8 pl-10 w-1/2">
        <h1 className="text-5xl text-[#172025]">
          Decentralized Financial <br /> Signal Hosting Network
        </h1>
        <p className="text-2xl">
          For Data Engineers, Traders
          <br /> and Everyone in between
        </p>
        <button
          type="button"
          className="self-start bg-gradient-to-r from-[#0055FF] to-primary text-white px-20 mt-6 h-14 border-b-[6px] border-solid border-[#00009c] rounded-xl"
          onClick={handleOpen}
        >
          Connect
        </button>
      </div>
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
