import Cookies from 'universal-cookie';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import NotFound from '@pages/not-found';
import OverviewBots from '@pages/overview-bots';
import Layout from './layouts';

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get('bearerToken');

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element:  <OverviewBots />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
