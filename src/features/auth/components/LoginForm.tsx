import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as Metamask } from '@assets/images/metamask.svg';
import { ReactComponent as Phantom } from '@assets/images/phantom.svg';
import Button from '@components/ui/Button';
import useLogin from '../hooks/useLogin';

export type WalletProps = 'Metamask' | 'Solana' | 'Phantom';

function LoginForm() {
  const [walletName, setWalletName] = useState<WalletProps>('Solana');
  const { handleLogin } = useLogin();

  const WALLETS = [
    { name: 'Phantom', icon: <Phantom height={20} width={20} /> },
    { name: 'Metamask', icon: <Metamask height={20} width={20} /> },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {WALLETS.map((item, i) => (
          <div
            key={i}
            role="button"
            className={classNames(
              'flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5',
              {
                '!border-blue': walletName === item.name,
              }
            )}
            onClick={() => setWalletName(item.name as WalletProps)}
          >
            <p
              className={classNames('text-dark/50 text-base', {
                '!text-dark': walletName === item.name,
              })}
            >
              {item.name}
            </p>
            <span>{item.icon}</span>
          </div>
        ))}
      </div>
      <Button
        text="Connect"
        size="lg"
        icon="login"
        fullWidth
        onClick={() => handleLogin(walletName)}
      />
    </div>
  );
}

export default LoginForm;
