import { LinearProgress } from "@mui/material";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const NavList = () => {
  const links = [
    {
      to: "/my-data",
      name: "My Data",
    },
    {
      to: "/browse-data",
      name: "Browse data",
    },
    {
      to: "/my-programms",
      name: "My programms",
    },
    {
      to: "/browse-programms",
      name: "Browse programms",
    },
    {
      to: "/account",
      name: "Account",
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
                  "text-[#7B8290] text-[16px] hover:text-blue",
                  {
                    "!text-blue": isActive,
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
};

const SideNavigation = () => {
  return (
    <div
      id="side-navigation"
      className="flex flex-col justify-between p-[30px]"
    >
      <div>
        <Link to="/my-data">
          <Logo />
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
};

export default SideNavigation;
