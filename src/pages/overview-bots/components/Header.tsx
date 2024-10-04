import React from 'react';
import { ITab, ITabs } from '../hooks/useProfile';
import {
  SetURLSearchParams,
} from 'react-router-dom';
import {
  RobotterLogo,
  BellIcon,
  WalletIcon,
  HeadProfileIcon,
  PhantomIcon,
} from '@assets/icons';
import CustomTabs from './CustomTabs';
import { useAuth } from '@contexts/auth-provider';
import useModal from '@shared/hooks/useModal';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import AppModal from '@components/ui/AppModal';
import LoginForm from '@shared/components/LoginForm';

export interface IHeaderProps {
  query: ITab;
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
  const { address } = useAuth();
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <header className="flex items-center justify-between w-full flex-wrap">
      <div className="flex items-center gap-x-4">
        <RobotterLogo />
        <div className="w-[35.25rem] h-[2.25rem]">
          <CustomTabs
            isTab
            query={query}
            tabs={tabs}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <span className="relative w-9 h-9 bg-blue-100 text-blue-400 rounded-full flex justify-center items-center cursor-pointer">
          <BellIcon width={'1rem'} height={'1rem'} />
          <span className="absolute top-[-5px] right-[-2px] flex justify-center items-center w-[1.125rem] h-[1.125rem] rounded-full bg-navy">
            <h3 className="font-bold text-xs text-white">3</h3>
          </span>
        </span>
        <span className="w-9 h-9 bg-blue-100 text-blue-400 rounded-full flex justify-center items-center cursor-pointer">
          <WalletIcon width={'1rem'} height={'1rem'} />
        </span>
        <span className="w-9 h-9 bg-blue-100 text-blue-400 rounded-full flex justify-center items-center cursor-pointer">
          <HeadProfileIcon width={'1rem'} height={'1rem'} />
        </span>
        {address ? (
          <span className="flex items-center justify-center gap-x-2 rounded-[33px] bg-blue-100 text-blue-400 text-sm font-normal w-[9.8125rem] h-[2.25rem]">
            <TruncatedAddress address={address} />
            <PhantomIcon />
          </span>
        ) : (
          <span 
            className="flex items-center justify-center gap-x-2 rounded-[33px] bg-blue-100 text-blue-400 text-sm font-normal w-[9.8125rem] h-[2.25rem] cursor-pointer"
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
