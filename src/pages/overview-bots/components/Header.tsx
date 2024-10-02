import { SetURLSearchParams } from 'react-router-dom';
import MenuModal from '@components/ui/MenuModal';
import { RobotterLogo } from '@assets/icons';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import React, { useState } from 'react';
import Switcher from './Switcher';
import {
  IChatTab,
  IDateTab,
  IPerfTab,
  IStratTab,
  ITab,
  ITabs,
  ITimeTab,
} from '../hooks/useProfile';

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
  const [showModal, setShowModal] = useState(false);

  const handleOpenMenu = () => setShowModal((prev) => !prev);

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

      <div className="lg:hidden cursor-pointer text-navy">
        {showModal ? (
          <MdClose size={24} onClick={handleOpenMenu} />
        ) : (
          <HiMenuAlt3 size={24} onClick={handleOpenMenu} />
        )}
        {showModal && (
          <MenuModal xtraStyle="justify-center absolute top-10 left-0 z-50 px-4 py-4 w-full" />
        )}
      </div>

      <MenuModal xtraStyle="hidden lg:flex justify-between" />
    </header>
  );
};

export default Header;
