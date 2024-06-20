import classNames from 'classnames';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '@components/ui/Button';
import useAuthWallet from '@features/auth/hook';

const LoginForm = () => {
  const { isLoading, handleConnect } = useAuthWallet();

  const { wallets, select, wallet } = useWallet();
  const SOLANA_WALLETS = wallets.map((x) => x.adapter);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {SOLANA_WALLETS.map((item, i) => (
          <div
            key={i}
            role="button"
            className={classNames(
              'flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5',
              {
                '!border-primary': wallet?.adapter.name === item.name,
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
            <img src={item.icon} width={40} height={40} alt={item.name} />
          </div>
        ))}
      </div>
      <Button
        text="Connect"
        size="lg"
        icon="login"
        fullWidth
        isLoading={isLoading}
        onClick={handleConnect}
      />
    </div>
  );
};

export default LoginForm;
