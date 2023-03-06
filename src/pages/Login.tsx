import FishnetLogo from '@assets/images/fishnet-logo.png';
import Button from '@components/ui/Button';
import { LoginForm } from '@features/auth';
import AppModal from '@components/ui/AppModal';
import useModal from '@shared/hooks/useModal';

const Login = () => {
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <div className="flex flex-col h-screen">
      <div className="p-5 px-[30px] bg-white flex justify-between items-center">
        <img src="./fishnet.png" alt="Robotter PNG" width={50} />
        <Button text="Connect to a wallet" onClick={handleOpen} />
      </div>
      <div className="h-full flex justify-center items-center">
        <img src={FishnetLogo} alt="Robotter PNG" />
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
