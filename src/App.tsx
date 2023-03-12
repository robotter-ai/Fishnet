import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { getUserInfo, setAuth } from '@slices/profileSlice';

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
  const { auth } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(
      setAuth({
        address: address || publicKey?.toBase58(),
        isConnected: isConnected || connected,
      })
    );
  }, [isConnected, connected, dispatch]);

  useEffect(() => {
    if (auth.isConnected) {
      navigate('/data', { replace: true });
      dispatch(getUserInfo());
    } else {
      navigate('/', { replace: true });
    }
  }, [auth.isConnected]);

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
