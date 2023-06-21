/* eslint-disable import/no-absolute-path */
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import { LoginForm } from '@features/auth';
import useAuth from '@shared/hooks/useAuth';
import useModal from '@shared/hooks/useModal';
import { useAppDispatch } from '@shared/hooks/useStore';
import { getUserInfo } from '@slices/profileSlice';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import FishnetLogo from '/fishnet-logo.png';
import { useConnect } from 'wagmi';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { isOpen, handleOpen, handleClose } = useModal();
  const { connectors } = useConnect();

  useEffect(() => {
    if (auth.isConnected) {
      navigate('/data', { replace: true });
      dispatch(getUserInfo(auth?.address));
    }
  }, [auth.isConnected]);

  return auth.isConnected ? (
    <Navigate to="/data" replace />
  ) : (
    <div className="flex flex-col h-screen">
      <div className="p-5 px-[30px] bg-white flex justify-between items-center">
        <img src="./fishnet0.png" alt="Robotter PNG" width={50} />
        <Button text="Connect to a wallet" onClick={handleOpen} />
      </div>
      <div className="h-full flex justify-center items-center">
        <img src={FishnetLogo} alt="Robotter PNG" width={1063} />
      </div>
      <AppModal
        title="Connect to a wallet"
        isOpen={isOpen}
        handleClose={handleClose}
        withInfo
      >
        <LoginForm />
      </AppModal>
    </div>
  );
};

export default Login;
