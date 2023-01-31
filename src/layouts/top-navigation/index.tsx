import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TbBellRinging2 } from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';
import WallteIcon from '@assets/images/wallet-icon.png';

function TopNavigation() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    handleGetAddress();
  }, []);

  const handleGetAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setAddress(await signer.getAddress());
  };

  return (
    <div id="top-navigation">
      <div className="flex justify-between">
        <h1>My Data</h1>
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center gap-3 rounded-[10px] p-[5px] px-[15px] border border-[#C4C4C4]">
            <span className="truncate w-[10rem] text-[#1C1C1C]">{address}</span>
            <img src={WallteIcon} alt="" />
          </div>
          <div
            className="bg-white rounded-[10px] p-[8.5px] cursor-pointer"
            style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
          >
            <TbBellRinging2 color="#1C1C1C" size={24} />
          </div>
          <div
            className="bg-white rounded-[10px] p-[8.5px] cursor-pointer"
            style={{ boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)' }}
          >
            <BsThreeDots color="#1C1C1C" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;
