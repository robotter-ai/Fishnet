import {
  BellIcon,
  WalletIcon,
  HeadProfileIcon,
  PhantomIcon,
} from '@assets/icons';
import Notification from '@pages/overview-bots/components/Notification';
import { useEffect, useRef, useState } from 'react';

interface IMenuModalProps {
  xtraStyle?: string;
}

const MenuModal: React.FC<IMenuModalProps> = ({ xtraStyle }) => {
  const [showNotify, setShowNotify] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleShowNotify = () => setShowNotify((prevState) => !prevState);

  useEffect(() => {
    const handleClickOutSide = (evt: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(evt.target as Node)) {
        setShowNotify(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className={`flex items-center gap-x-3 bg-white ${xtraStyle || ''}`}>
      <span
        className="relative w-9 h-9 bg-blue-100 text-blue-400 rounded-full flex justify-center items-center cursor-pointer"
        onClick={handleShowNotify}
      >
        <BellIcon width="1rem" height="1rem" />
        <span className="absolute top-[-5px] right-[-2px] flex justify-center items-center w-[1.125rem] h-[1.125rem] rounded-full bg-navy">
          <h3 className="font-bold text-xs text-white">3</h3>
        </span>
        {showNotify && <Notification ref={divRef} />}
      </span>
      <span className="w-9 h-9 bg-blue-100 text-blue-400 rounded-full flex justify-center items-center cursor-pointer">
        <WalletIcon width="1rem" height="1rem" />
      </span>
      <span className="w-9 h-9 bg-blue-100 text-blue-400 rounded-full flex justify-center items-center cursor-pointer">
        <HeadProfileIcon width="1rem" height="1rem" />
      </span>
      <span className="flex items-center justify-center gap-x-2 rounded-[33px] bg-blue-100 text-blue-400 text-sm font-normal w-[9.8125rem] h-[2.25rem]">
        <h3>0xe5...48sx</h3> <PhantomIcon />
      </span>
    </div>
  );
};

export default MenuModal;
