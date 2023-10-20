import { Navigate, Outlet } from 'react-router-dom';
import TopNavigation from './top-navigation';
import SideNavigation from './side-navigation';
import './layout.scss';
import useLogin from "@shared/hooks/useLogin";

const Layout = () => {
  const { hasEntered } = useLogin();

  return hasEntered ? (
    <div id="layout-wrapper">
      <SideNavigation />
      <TopNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Layout;
