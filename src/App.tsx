import { useEffect } from 'react';
import { ethers } from 'ethers';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import ConnectWallet from '@pages/Login';
import MyData from '@pages/my-data';
import DataDetails from '@pages/my-data/DataDetails';
import Layout from './layouts';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    if (address) {
      navigate('/my-data');
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route element={<Layout />}>
          <Route path="/my-data" element={<MyData />} />
          <Route path="/my-data/:id" element={<DataDetails />} />
        </Route>
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
      {/* <ToastContainer /> */}
    </div>
  );
}
