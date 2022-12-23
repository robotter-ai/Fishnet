import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Metamask } from "../../../assets/images/metamask.svg";
import { ReactComponent as Solana } from "../../../assets/images/solana.svg";
import { ReactComponent as Phantom } from "../../../assets/images/phantom.svg";
import Button from "../../../components/ui/Button";

const ConnectWalletForm = () => {
  const navigate = useNavigate();
  const [activeWallet, setActiveWallet] = useState(1);

  const wallets = [
    { name: "Metamask", icon: <Metamask height={25} width={25} /> },
    { name: "Solana", icon: <Solana height={25} width={25} /> },
    { name: "Phantom", icon: <Phantom height={25} width={25} /> },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4">
        {wallets.map((item, i) => (
          <div
            key={i}
            className={classNames(
              "flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-[10px] p-[16px] cursor-pointer",
              {
                "!bg-white !border-[#8bffdc]": i + 1 === activeWallet,
              }
            )}
            onClick={() => setActiveWallet(i + 1)}
          >
            <p className="text-[#172025] font-bold text-[18px]">{item.name}</p>
            <span>{item.icon}</span>
          </div>
        ))}
      </div>
      <div>
        <p className="text-center mt-[10px] mb-[30px]">
          New to Solana?{" "}
          <a href="#" className="text-blue font-bold">
            Learn about wallets
          </a>
        </p>
      </div>
      <Button
        text="Connect wallet"
        size="lg"
        fullWidth
        onClick={() => navigate("/my-data")}
      />
    </div>
  );
};

export default ConnectWalletForm;
