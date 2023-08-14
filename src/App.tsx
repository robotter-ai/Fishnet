import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';
import useLogin, { WalletNameTypes } from '@features/auth/hooks/useLogin';

import Login from '@pages/Login';
import MyData from '@pages/data';
import DataDetails from '@pages/data/DataDetails';
import Algorithms from '@pages/algorithms';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
import Layout from './layouts';

export default function App() {
  const { isConnected } = useAccount();
  const { handleLogin } = useLogin();

  useEffect(() => {
    const state = localStorage.getItem('wallet.connected.status') || '';
    const name = localStorage.getItem('wallet.connected.name') || '';
    if (!isConnected && state === 'true' && name) {
      handleLogin(name as WalletNameTypes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wallet.connected.status', isConnected.toString());
  }, [isConnected]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/data" element={<MyData />} />
          <Route path="/data/:id/details" element={<DataDetails />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/monitor-access" element={<MonitorAccess />} />
          <Route
            path="/monitor-access/:id/settings"
            element={<DataSettings />}
          />
          <Route path="/profile" element={<MyProfile />} />
        </Route>
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
      <ToastContainer />
    </>
  );
}
