import Cookies from 'universal-cookie';
import { createBrowserRouter, redirect } from 'react-router-dom';

import MyData from '@pages/data';
import DataDetails from '@pages/data/data-details';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
import Login from '@pages/Login';

import Layout from './layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <Layout />,
    loader: () => {
      const cookies = new Cookies();
      const token = cookies.get('bearerToken');

      if (!token) {
        return redirect('/');
      }

      return { token };
    },
    children: [
      {
        path: 'data',
        element: <MyData />,
      },
      {
        path: 'data/:id/details',
        element: <DataDetails />,
      },
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
    element: <h1>Not Found!</h1>,
  },
]);

// TODO: Toast Classname "!bg-[#F6FAFB] !w-fit !py-3 !whitespace-nowrap !px-8 right-1/2 -translate-x-1/2 !rounded-full"
