import { Routes, Route } from "react-router-dom";
import Layout from "./layouts";
import ConnectWallet from "./pages/ConnectWallet";
import MyData from "./pages/MyData";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ConnectWallet />} />
      <Route element={<Layout />}>
        <Route path="/my-data" element={<MyData />} />
      </Route>
      <Route path="*" element={<h1>Not Found!</h1>} />
    </Routes>
  );
}
