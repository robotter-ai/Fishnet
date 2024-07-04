import classNames from 'classnames';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '@components/ui/Button';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { useMemo, useState } from 'react';

const LoginForm = () => {
  const { wallets, select } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<WalletName | null>(null);
  const solanaWallets = useMemo(() => {
    return wallets.filter((wallet) =>
      wallet.readyState === WalletReadyState.Installed 
      && wallet.adapter.name !== 'Brave Wallet'
    ).map((x) => x.adapter)
  }, [wallets]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {solanaWallets.map((item, i) => (
          <div
            key={i}
            role="button"
            className={classNames(
              'flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5',
              {
                '!border-primary': selectedWallet === item.name,
              }
            )}
            onClick={() => setSelectedWallet(item.name)}
          >
            <p
              className={classNames('text-dark/50 text-base', {
                '!text-dark': item.name,
              })}
            >
              {item.name}
            </p>
            <img src={item.icon} width={40} height={40} alt={item.name} />
          </div>
        ))}
      </div>
      <Button
        text="Connect"
        size="lg"
        icon="login"
        fullWidth
        onClick={() => select(selectedWallet)}
      />
    </div>
  );
};

export default LoginForm;
