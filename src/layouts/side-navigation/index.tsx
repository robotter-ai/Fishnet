import { LinearProgress } from '@mui/material';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

function NavList() {
  const links = [
    {
      to: '/data',
      name: 'Data',
    },
    {
      to: '/algorithms',
      name: 'Algorithms',
    },
    {
      to: '/monitor-access',
      name: 'Monitor access',
    },
    {
      to: '/profile',
      name: 'My profile',
    },
  ];

  return (
    <ul className="flex flex-col gap-[15px]">
      {links.map((item, i) => (
        <li key={i}>
          <NavLink to={item.to}>
            {({ isActive }) => (
              <div
                className={classNames(
                  'text-[#7B8290] text-[16px] hover:text-blue',
                  {
                    '!text-blue': isActive,
                  }
                )}
              >
                <span>{item.name}</span>
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function SideNavigation() {
  return (
    <div
      id="side-navigation"
      className="flex flex-col justify-between p-[30px]"
    >
      <div>
        <Link to="/data">
          <img src="./fishnet.png" alt="Robotter PNG" width={50} />
        </Link>
        <nav className="mt-[47px]">
          <NavList />
        </nav>
      </div>
      <div className="border-t pt-[32px] border-t-[#e0e0e0]">
        <p className="text-[#7B8290]">
          <span className="font-bold text-[#172025]">123 GB</span> of 200
        </p>
        <div className="text-blue mt-[24px]">
          <LinearProgress variant="determinate" value={40} color="inherit" />
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
