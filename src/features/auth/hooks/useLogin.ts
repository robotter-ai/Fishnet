import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleRequestAccount = async () => {
    toast.error('Not detected');
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        handleAccountChange(accounts[0]);
      } catch (error) {
        toast.error('Error connecting...');
      }
    } else {
      toast.error('Not detected');
    }
  };

  const handleAccountChange = (account: any) => {
    setWalletAddress(account);
  };

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await handleRequestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // let accounts = await provider.send("eth_requestAccounts", []);
      // provider.on("accountsChanged", function (accounts) {
      //   account = accounts[0];
      //   console.log(address); // Print new address
      // });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      navigate('/my-data');
    }
  };

  window.ethereum.on('accountsChanged', handleAccountChange);

  return { handleConnectWallet };
};
