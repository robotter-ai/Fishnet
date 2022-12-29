import { useEffect } from "react";
import { ethers } from "ethers";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts";
import ConnectWallet from "./pages/Login";
import MyData from "./pages/MyData";

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
      navigate("/my-data");
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route element={<Layout />}>
          <Route path="/my-data" element={<MyData />} />
        </Route>
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
      {/* <ToastContainer /> */}
    </div>
  );
}
