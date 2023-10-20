import { useEffect, useState } from 'react';
import WalletIcon from '@assets/images/wallet-icon.png';
import usePageTitle from '@shared/hooks/usePageTitle';
import classNames from 'classnames';
import useAuth from '@shared/hooks/useAuth';
import { BellIcon } from '@assets/icons';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { getNotifications } from '@slices/profileSlice';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import Button from "@components/ui/Button";
import useModal from "@shared/hooks/useModal";
import AppModal from "@components/ui/AppModal";
import LoginForm from "@shared/components/LoginForm";

function TopNavigation() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.profile.notificationActions);
  const { title } = usePageTitle();
  const { address, hasValidToken } = useAuth();
  const { isOpen, handleOpen, handleClose } = useModal();
  const [isNotification, setNotification] = useState<boolean>(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setNotification(false),
  });

  useEffect(() => {
    dispatch(getNotifications(address));
  }, []);

  return (
    <div id="top-navigation">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1>{title}</h1>
        </div>
        {!hasValidToken ? (
          <>
            <Button
              text="Connect Wallet"
              icon="login"
              onClick={handleOpen}/>
            <AppModal
              title="Connect a wallet"
              isOpen={isOpen}
              handleClose={handleClose}>
              <LoginForm/>
            </AppModal>
          </>
        ) : (
          <div ref={ref} className="relative flex items-center gap-[15px]">
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
                  {Array.isArray(data) &&
                    data?.map((item: any, idx: number) => (
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
        )}
      </div>
    </div>
  );
}

export default TopNavigation;
