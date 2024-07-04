import { useEffect, useState } from 'react';
import WalletIcon from '@assets/images/wallet-icon.png';
import usePageTitle from '@shared/hooks/usePageTitle';
import classNames from 'classnames';
import { useAuth } from '@contexts/auth-provider';
import { BellIcon } from '@assets/icons';
import { useDetectClickOutside } from 'react-detect-click-outside';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import { useGetNotificationsQuery } from '@store/profile/api';
import useModal from '@shared/hooks/useModal';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import LoginForm from '@shared/components/LoginForm';
import { INotification } from '@store/profile/types';

function TopNavigation() {
  const { address } = useAuth();
  const { title } = usePageTitle();
  const { isOpen, handleOpen, handleClose } = useModal();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isNotification, setNotification] = useState(false);
  const notificationRef = useDetectClickOutside({
    onTriggered: () => setNotification(false),
  });

  const { data } = useGetNotificationsQuery({ address }, { skip: !address });

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  useEffect(() => {
    if (address !== '' && isOpen) {
      handleClose();
    }
  }, [address]);
  
  return (
    <>
      <div id="top-navigation">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h1>{title}</h1>
          </div>
          {address ? 
              <div
                ref={notificationRef}
                className="relative flex items-center gap-[15px]"
              >
                <div className="flex bg-light-blue rounded-[33px] items-center gap-3 py-2 px-6 ">
                    <span className="text-[#1C1C1C]">
                      <TruncatedAddress address={address} />
                    </span>
                  <img src={WalletIcon} alt="" />
                </div>
                <div
                  className="bg-light-blue h-9 w-9 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#f3f3f3] transition-all duration-100"
                  style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
                  onClick={() => {
                    setNotification(!isNotification);
                  }}
                >
                  <BellIcon />
                </div>
                {isNotification ? (
                  <div
                    className="absolute w-full bg-white top-12 min-h-72 px-5 rounded-[10px] z-[30000000] overflow-y-scroll"
                    style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
                  >
                    <div className="flex flex-col">
                      {notifications.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className={classNames(
                              'border-b border-b-[rgba(16, 30, 115, 0.06)] py-4',
                              {
                                'border-b-transparent': idx + 1 === 3,
                              }
                            )}
                          >
                            <p className="text-[#29324A] text-base leading-4 mb-2">
                              {item.message_text}
                            </p>
                            <p className="text-sm text-[#91989C] leading-none">
                              8h ago
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            :
            <div className="px-2">
              <Button text="Connect Wallet" icon="login" onClick={handleOpen} />
            </div>
          }
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
}

export default TopNavigation;
