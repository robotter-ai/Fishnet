import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import LoginForm from '@shared/components/LoginForm';
import useModal from '@shared/hooks/useModal';
import LoginWaveImg from '@assets/images/login-wave.png';

const Login = () => {
  const { isOpen, handleOpen, handleClose } = useModal();

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
          {/* <Button
            text="Enter Fishnet"
            icon="home"
            onClick={() => {
              navigate('/data', { replace: true });
            }}
          />
          <div className="bg-[#F6FAFB] text-center flex flex-col justify-center py-[10px] px-[25%]">
            <p className="text-2xl">
              This app is only for demonstration purposes. <br />
              Do not upload any sensitive data.
            </p>
          </div> */}
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
