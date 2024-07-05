import Cookies from 'universal-cookie';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import MyData from '@pages/data';
import DataDetails from '@pages/data/DataDetails';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
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
    ],
  },
  {
    path: '*',
    element: <h1>Not Found!</h1>,
  },
]);

// TODO: Toast Classname "!bg-[#F6FAFB] !w-fit !py-3 !whitespace-nowrap !px-8 right-1/2 -translate-x-1/2 !rounded-full"
