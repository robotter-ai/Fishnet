import { FolderIcon, LockIcon, LogoutIcon, ProfileIcon } from '@assets/icons';
import { useAuth } from '@contexts/auth-provider';
import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

function NavList() {
  const { address } = useAuth();

  const links = [
    {
      to: '/',
      icon: <FolderIcon />,
      label: 'Home',
      requiresAuth: false,
    },
    {
      to: '/monitor-access',
      icon: <LockIcon />,
      label: 'Monitor Access',
      requiresAuth: true,
    },
    {
      to: '/profile',
      icon: <ProfileIcon />,
      label: 'Profile',
      requiresAuth: true,
    },
  ];

  return (
    <ul className="flex flex-col gap-[40px]">
      {links.map((item, i) => (
        <li key={i}>
          {item.requiresAuth && address === '' ? (
            <Tooltip title="Login required" placement="right">
              <div className="text-[#7B8290] text-[16px] cursor-not-allowed">
                <div className="h-[24px]">{item.icon}</div>
              </div>
            </Tooltip>
          ) : (
            <NavLink to={item.to}>
              {({ isActive }) => (
                <div
                  className={classNames(
                    'text-[#7B8290] text-[16px] hover:text-primary',
                    {
                      '!text-primary': isActive,
                    }
                  )}
                >
                  <div className="h-[24px]">{item.icon}</div>
                </div>
              )}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

function SideNavigation() {
  const { address, resetAuth } = useAuth();

  return (
    <div
      id="side-navigation"
      className="flex flex-col justify-between pt-8 pb-14"
    >
      <div className="flex flex-col items-center">
        <Link to="/">
          <img src="./fishnet.png" alt="Robotter PNG" width={36} />
        </Link>
        <nav className="mt-[56px]">
          <NavList />
        </nav>
      </div>
      {address ? (
        <div className="pt-8 border-t border-solid border-t-[#C8CCCD]">
          <LogoutIcon
            color="#91999C"
            className="cursor-pointer"
            onClick={resetAuth}
          />
        </div>
      ) : null}
    </div>
  );
}

export default SideNavigation;
