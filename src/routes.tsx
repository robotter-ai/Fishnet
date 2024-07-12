import Cookies from 'universal-cookie';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import MyData from '@pages/data';
import DataDetails from '@pages/data/DataDetails';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
import NotFound from '@pages/not-found';
import Layout from './layouts';

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get('bearerToken');

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MyData />,
      },
      {
        path: 'data/:id',
        element: <DataDetails />,
      },

      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'monitor-access',
            element: <MonitorAccess />,
          },
          {
            path: 'monitor-access/:id/settings',
            element: <DataSettings />,
          },
          {
            path: 'profile',
            element: <MyProfile />,
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
