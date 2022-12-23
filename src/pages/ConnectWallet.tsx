import { ReactComponent as Logo } from "../assets/images/logo.svg";
import Robotter from "../assets/images/robotter.png";
import Button from "../components/ui/Button";
import { ConnectWalletForm } from "../features/authentication";
import AppModal from "../components/ui/AppModal";
import useModal from "../hooks/useModal";

const ConnectWallet = () => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <div className="flex flex-col h-screen">
      <div className="p-5 px-[30px] bg-white flex justify-between items-center">
        <Logo />
        <Button text="Connect to a wallet" onClick={handleOpen} />
      </div>
      <div className="h-full flex justify-center items-center">
        <img src={Robotter} alt="Robotter PNG" />
      </div>
      <AppModal
        title="Connect to a wallet"
        open={open}
        handleClose={handleClose}
        withInfo
      >
        <ConnectWalletForm />
      </AppModal>
    </div>
  );
};

export default ConnectWallet;
