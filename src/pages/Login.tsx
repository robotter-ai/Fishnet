/* eslint-disable import/no-absolute-path */
import { useEffect } from 'react';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import { LoginForm } from '@features/auth';
import useAuth from '@shared/hooks/useAuth';
import useModal from '@shared/hooks/useModal';
import { useAppDispatch } from '@shared/hooks/useStore';
import { getUserInfo } from '@slices/profileSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import FishnetLogo from '/fishnet-logo.png';
import { ReactComponent as WaveBg } from '@assets/images/wave.svg';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { isOpen, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (auth.isConnected) {
      navigate('/data', { replace: true });
      dispatch(getUserInfo(auth?.address));
    }
  }, [auth.isConnected]);

  return auth.isConnected ? (
    <Navigate to="/data" replace />
  ) : (
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
