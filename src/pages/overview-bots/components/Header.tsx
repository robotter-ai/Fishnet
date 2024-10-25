import React, { useEffect } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import {
  RobotterLogo,
  BellIcon,
  WalletIcon,
  HeadProfileIcon,
  PhantomIcon,
} from '@assets/icons';
import { useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import AppModal from '@components/ui/AppModal';
import LoginForm from '@shared/components/LoginForm';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  IChatTab,
  IDateTab,
  IPerfTab,
  IStratTab,
  ITab,
  ITabs,
  ITimeTab,
} from '../hooks/useProfile';
import Switcher from './Switcher';

export interface IHeaderProps {
  query: ITab | ITimeTab | IDateTab | IStratTab | IChatTab | IPerfTab;
  tabs: ITabs[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const Header: React.FC<IHeaderProps> = ({
  query,
  tabs,
  searchParams,
  setSearchParams,
}) => {
  const { address } = useAppSelector((state) => state.auth);
  const { isOpen, handleOpen, handleClose } = useModal();
  const { wallet } = useWallet();

  const getWalletIcon = () => {
    if (!wallet) return null;

    if (wallet.adapter.icon) {
      return (
        <img
          src={wallet.adapter.icon}
          alt={wallet.adapter.name}
          width="16"
          height="16"
        />
      );
    }
  };

  useEffect(() => {
    if (address) {
      handleClose();
    }
  }, [address, handleClose]);

  return (
    <header className="flex items-center justify-between gap-x-4 w-full relative">
      <div className="flex items-center gap-x-4 w-full">
        <RobotterLogo />
        <div className="max-w-[35.25rem] w-full h-[2.25rem]">
          <Switcher
            keyQuery="tab"
            isHeader
            query={query}
            tabs={tabs}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <span className="relative w-9 h-9 bg-blue-100 text-blue-400 hover:text-blue-300 rounded-full flex justify-center items-center cursor-pointer">
          <BellIcon width="1.5rem" height="1.5rem" />
          <span className="absolute top-[-5px] right-[-5px] flex justify-center items-center w-[1.125rem] h-[1.125rem] rounded-full bg-navy">
            <h3 className="font-bold text-xs text-white">3</h3>
          </span>
        </span>
        <span className="w-9 h-9 bg-blue-100 text-blue-400 hover:text-blue-300 rounded-full flex justify-center items-center cursor-pointer">
          <WalletIcon width="1.5rem" height="1.5rem" />
        </span>
        <span className="w-9 h-9 bg-blue-100 text-blue-400 hover:text-blue-300 rounded-full flex justify-center items-center cursor-pointer">
          <HeadProfileIcon width="1.5rem" height="1.5rem" />
        </span>
        {address ? (
          <span className="flex items-center justify-center gap-x-2 rounded-[33px] bg-blue-100 text-blue-400 text-sm font-normal w-[9.8125rem] h-[2.25rem]">
            <TruncatedAddress address={address} />
            {getWalletIcon()}
          </span>
        ) : (
          <span
            className={`flex items-center justify-center gap-x-2 rounded-[33px] bg-blue-100 text-blue-400 hover:text-blue-300 border border-transparent text-sm font-normal w-[9.8125rem] h-[2.25rem] cursor-pointer ${
              address !== '' ? 'text-blue-300 border-blue-300' : ''
            }`}
            onClick={handleOpen}
          >
            Connect Wallet
          </span>
        )}
      </div>
      <AppModal
        title="Connect a wallet"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <LoginForm />
      </AppModal>
    </header>
  );
};

export default Header;
