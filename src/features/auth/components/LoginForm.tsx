import classNames from 'classnames';
import useLogin from '../hooks/useLogin';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '@components/ui/Button';

function LoginForm() {
  const { wallets, select, wallet } = useWallet();
  const { handleConnectWallet } = useLogin();
  const solanaWallets = wallets.map((wallet) => wallet.adapter);

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
                '!border-blue': wallet?.adapter.name === item.name,
              }
            )}
            onClick={() => select(item.name)}
          >
            <p
              className={classNames('text-dark/50 text-base', {
                '!text-dark': item.name,
              })}
            >
              {item.name}
            </p>
            <img src={item.icon} width={40} height={40}></img>
          </div>
        ))}
      </div>
      <Button
        text="Connect"
        size="lg"
        icon="login"
        fullWidth
        onClick={() => handleConnectWallet()}
      />
    </div>
  );
}

export default LoginForm;
