import Cookies from 'universal-cookie';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import MyData from '@pages/data';
import DataDetails from '@pages/data/DataDetails';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
import NotFound from '@pages/not-found';
import OverviewBots from '@pages/overview-bots';

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get('bearerToken');

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <h2>Go to /overview</h2>,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'overview',
            element: <OverviewBots />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
