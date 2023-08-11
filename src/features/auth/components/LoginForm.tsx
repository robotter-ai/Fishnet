import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as Metamask } from '@assets/images/metamask.svg';
import { ReactComponent as Solana } from '@assets/images/solana.svg';
import { ReactComponent as Phantom } from '@assets/images/phantom.svg';
import Button from '@components/ui/Button';
import useLoginForm from '../hooks/useLoginForm';

export type WalletProps = 'Metamask' | 'Solana' | 'Phantom';

function LoginForm() {
  const { handleConnectWallet } = useLoginForm();
  const [activeWallet, setActiveWallet] = useState<WalletProps>('Metamask');

  const wallets: { name: WalletProps; icon: React.ReactNode }[] = [
    { name: 'Metamask', icon: <Metamask height={25} width={25} /> },
    { name: 'Solana', icon: <Solana height={25} width={25} /> },
    { name: 'Phantom', icon: <Phantom height={25} width={25} /> },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4">
        {wallets.map((item, i) => (
          <div
            key={i}
            role="button"
            className={classNames(
              'flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-[10px] p-[16px]',
              {
                '!bg-white !border-[#8bffdc]': activeWallet === item.name,
              }
            )}
            onClick={() => setActiveWallet(item.name)}
          >
            <p className="text-[#172025] font-bold text-[18px]">{item.name}</p>
            <span>{item.icon}</span>
          </div>
        ))}
      </div>
      <div>
        <p className="text-center mt-[10px] mb-[30px]">
          New to Solana?{' '}
          <a href="/" className="text-blue font-bold">
            Learn about wallets
          </a>
        </p>
      </div>
      <Button
        text="Connect wallet"
        size="lg"
        fullWidth
        onClick={() => handleConnectWallet(activeWallet)}
      />
    </div>
  );
}

export default LoginForm;
