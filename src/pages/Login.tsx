import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import LoginForm from '@shared/components/LoginForm';
import useModal from '@shared/hooks/useModal';
import LoginWaveImg from '@assets/images/login-wave.png';
import { useAuth } from '@contexts/auth-provider';
import { useEffect } from 'react';

const Login = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const { address } = useAuth();

  useEffect(() => {
    if (address) {
      handleClose();
    }
  }, [address, handleClose]);
  
  return (
    <>
      <div className="flex flex-col h-[100vh] bg-white">
        <div className="py-5 px-8 flex justify-between items-center">
          <a href="https://fishnet.tech">
            <img src="./fishnet.png" alt="Fishnet Logo" width={50} />
          </a>
          <Button text="Connect Wallet" icon="login" onClick={handleOpen} />
        </div>
        <div className="relative h-full mt-20 flex flex-col">
          <a href="https://fishnet.tech">
            <img
              src="./Logo_Fishnet_alpha.svg"
              alt="Fishnet Logo"
              className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1/2"
            />
          </a>
          <img
            src={LoginWaveImg}
            alt="Fishnet Logo"
            className="w-full h-full"
          />
          {}
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
