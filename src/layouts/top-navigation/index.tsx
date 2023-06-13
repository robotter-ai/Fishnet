import { useEffect, useState } from 'react';
import WallteIcon from '@assets/images/wallet-icon.png';
import usePageTitle from '@shared/hooks/usePageTitle';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import useAuth from '@shared/hooks/useAuth';
import { AlarmClockIcon, ThreeDotsIcon } from '@assets/icons';
import { useDetectClickOutside } from 'react-detect-click-outside';
import useLogout from '@shared/hooks/useLogout';
import { StatusIndicator } from '@shared/constant';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { getNotifications } from '@slices/profileSlice';

function TopNavigation() {
  useLogout();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.profile.notificationActions);
  const { title, pageStatus } = usePageTitle();
  const auth = useAuth();
  const { pathname } = useLocation();
  const [toggledInfo, setToggledInfo] = useState<
    'notification' | 'profile' | null
  >(null);
  const ref = useDetectClickOutside({
    onTriggered: () => setToggledInfo(null),
  });

  useEffect(() => {
    dispatch(getNotifications(auth.address));
  }, [auth.address]);

  const isDataDetails =
    pathname.startsWith('/data') &&
    pathname.endsWith('details') &&
    pathname.split('/')[2] !== 'upload';

  return (
    <div id="top-navigation">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1>{title}</h1>
          {isDataDetails && pageStatus !== 'NOT REQUESTED' ? (
            <StatusIndicator status={pageStatus || ''} />
          ) : null}
        </div>
        <div ref={ref} className="relative flex items-center gap-[15px]">
          <div className="flex items-center gap-3 rounded-[10px] p-[5px] px-[15px] border border-[#C4C4C4]">
            <span className="truncate w-[10rem] text-[#1C1C1C]">
              {auth?.address}
            </span>
            <img src={WallteIcon} alt="" />
          </div>
          <div
            className="bg-white h-9 w-9 rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#f3f3f3] transition-all duration-100"
            style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
            onClick={() =>
              setToggledInfo(
                toggledInfo === 'notification' ? null : 'notification'
              )
            }
          >
            <AlarmClockIcon />
          </div>
          <div
            className="bg-white h-9 w-9 rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#f3f3f3] transition-all duration-100"
            style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
            onClick={() =>
              setToggledInfo(toggledInfo === 'profile' ? null : 'profile')
            }
          >
            <ThreeDotsIcon />
          </div>
          {toggledInfo === 'profile' ? (
            <div
              className="absolute w-full top-12 bg-white px-5 rounded-[8px] z-50"
              style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
            >
              <div className="flex flex-col">
                <Link
                  to="/profile"
                  className="pt-3 pb-2"
                  onClick={() => setToggledInfo(null)}
                >
                  Profile
                </Link>
                <div
                  style={{ borderTop: '0.5px solid rgba(41, 50, 74, 0.15)' }}
                />
                <button
                  type="button"
                  className="pb-3 pt-2 self-start text-[#FD686A] text-lg"
                  onClick={() => setToggledInfo(null)}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : null}
          {toggledInfo === 'notification' ? (
            <div
              className="absolute w-full top-12 bg-white px-5 rounded-[8px] z-50"
              style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
            >
              <div className="flex flex-col">
                {Array.isArray(data) &&
                  data.map((item: any, idx: number) => (
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
                      {/* <p className="text-sm text-[#91989C] leading-none">
                        8h ago
                      </p> */}
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;
