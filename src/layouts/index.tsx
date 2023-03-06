import { Outlet } from 'react-router-dom';
import TopNavigation from './top-navigation';
import SideNavigation from './side-navigation';
import './layout.scss';

function Layout() {
  return (
    <div id="layout-wrapper">
      <SideNavigation />
      <TopNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
