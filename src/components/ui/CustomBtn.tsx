import {
  AttachIcon,
  BoxIcon,
  BuyIcon,
  DownloadIcon,
  EditIcon,
  ExportIcon,
  HomeIcon,
  LockIcon,
  LoginIcon,
  SettingsIcon,
  ShieldTickIcon,
} from '@assets/icons';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { FadeLoader } from 'react-spinners';

type IconTypes =
  | 'upload'
  | 'attach'
  | 'edit'
  | 'home'
  | 'download'
  | 'buy'
  | 'lock'
  | 'settings'
  | 'login'
  | 'box'
  | 'shield';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: IconTypes;
  size?: 'sm' | 'md' | 'lg';
  btnStyle?: 'outline-primary' | 'solid-primary' | 'outline-secondary';
  xtraStyles?: string;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const ICONS: Record<IconTypes, JSX.Element> = {
  upload: <ExportIcon />,
  attach: <AttachIcon />,
  edit: <EditIcon />,
  home: <HomeIcon />,
  download: <DownloadIcon />,
  buy: <BuyIcon />,
  lock: <LockIcon width={19} height={19} />,
  settings: <SettingsIcon />,
  login: <LoginIcon width={20} height={20} />,
  box: <BoxIcon width={20} height={20} />,
  shield: <ShieldTickIcon width={20} height={20} />,
};

const CustomBtn: React.FC<ButtonProps> = ({
  text,
  size = 'lg',
  btnStyle = 'solid-primary',
  xtraStyles,
  isLoading,
  disabled,
  icon,
  fullWidth,
  ...rest
}) => {
  const btnClassnames = classNames(
    `flex justify-center items-center relative px-5 bg-navy !text-white text-center border border-transparent rounded-[76px] whitespace-nowrap disabled:cursor-not-allowed transition-colors duration-300  `,
    {
      'h-[1.4375rem] text-xs font-normal px-2 py-1': size === 'sm',
      'h-[2.75rem] py-[9px] text-base font-semibold': size === 'lg',
      'bg-transparent border-navy !text-navy hover:!bg-navy hover:!text-white':
        btnStyle === 'outline-primary',
      'bg-transparent border-red-100 !text-red-100 hover:!bg-red-100 hover:!text-white':
        btnStyle === 'outline-secondary',
      'hover:!bg-navy/60': btnStyle === 'solid-primary',
      'w-full': fullWidth,
    },
    `${xtraStyles ? xtraStyles : ''}`
  );

  return (
    <button
      {...rest}
      className={btnClassnames}
      disabled={disabled || isLoading}
    >
      <div
        className={classNames('flex gap-[11px] justify-center items-center', {
          'text-transparent': isLoading,
        })}
      >
        {icon ? ICONS[icon] : null}
        {text}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center absolute top-1/2 left-1/2">
          <FadeLoader
            color="currentColor"
            height={6}
            margin={-10}
            width={1.25}
          />
        </div>
      ) : null}
    </button>
  );
};

export default CustomBtn;
