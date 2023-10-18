import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@shared/hooks/useAuth';
import TopNavigation from './top-navigation';
import SideNavigation from './side-navigation';
import './layout.scss';

const Layout = () => {
  const auth = useAuth();

  return auth.hasValidToken ? (
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
