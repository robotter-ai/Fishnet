import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '@shared/hooks/useStore';
import { setUser } from '@features/auth/slices/userSlice';

import Login from '@pages/Login';
import MyData from '@pages/data';
import DataDetails from '@pages/data/DataDetails';
import Algorithms from '@pages/algorithms';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
import Layout from './layouts';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isConnected, address } = useAccount();
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (isConnected || connected) {
      navigate('/data');
    } else {
      navigate('/');
    }

    dispatch(
      setUser({
        address: address || publicKey?.toBase58(),
        isConnected: isConnected || connected,
      })
    );
  }, [isConnected, connected, dispatch]);

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
