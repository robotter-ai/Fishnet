import { Routes, Route } from 'react-router-dom';

import Login from '@pages/Login';
import MyData from '@pages/data';
import DataDetails from '@pages/data/DataDetails';
import MonitorAccess from '@pages/monitor-access';
import DataSettings from '@pages/monitor-access/DataSettings';
import MyProfile from '@pages/my-profile';
import { Toaster } from 'sonner';
import Layout from './layouts';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/data" element={<MyData />} />
          <Route path="/data/:id/details" element={<DataDetails />} />
          <Route path="/monitor-access" element={<MonitorAccess />} />
          <Route
            path="/monitor-access/:id/settings"
            element={<DataSettings />}
          />
          <Route path="/profile" element={<MyProfile />} />
        </Route>
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            '!bg-[#F6FAFB] !w-fit !py-3 !whitespace-nowrap !px-8 right-1/2 -translate-x-1/2 !rounded-full',
        }}
        richColors
      />
    </>
  );
}
