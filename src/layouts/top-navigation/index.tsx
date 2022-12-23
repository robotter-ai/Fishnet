import { TbBellRinging2 } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import WallteIcon from "../../assets/images/wallet-icon.png";

const TopNavigation = () => {
  return (
    <div id="top-navigation">
      <div className="flex justify-between">
        <h1>My Data</h1>
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center gap-3 rounded-[10px] p-[5px] px-[15px] border border-[#C4C4C4]">
            <span className="text-[#1C1C1C]">0x0e5005363748..</span>
            <img src={WallteIcon} alt="" />
          </div>
          <div
            className="bg-white rounded-[10px] p-[8.5px] cursor-pointer"
            style={{ boxShadow: "0px 12px 26px rgba(16, 30, 115, 0.06)" }}
          >
            <TbBellRinging2 color="#1C1C1C" size={24} />
          </div>
          <div
            className="bg-white rounded-[10px] p-[8.5px] cursor-pointer"
            style={{ boxShadow: "0px 12px 26px rgba(16, 30, 115, 0.06)" }}
          >
            <BsThreeDots color="#1C1C1C" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
