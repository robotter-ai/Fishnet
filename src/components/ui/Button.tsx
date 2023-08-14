import {
  AttachIcon,
  BuyIcon,
  DownloadIcon,
  EditIcon,
  ExportIcon,
  HomeIcon,
  LockIcon,
  LoginIcon,
  SettingsIcon,
} from '@assets/icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
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
  | 'login';

interface ButtonProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: IconTypes;
  btnStyle?: 'outline-blue' | 'outline-red' | 'solid-blue';
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  href?: string;
  fullWidth?: boolean;
  withoutBorder?: boolean;
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
  login: <LoginIcon width={19} height={19} />,
};

const CustomButton: React.FC<ButtonProps> = ({
  type = 'button' || 'download',
  text,
  size = 'sm',
  btnStyle,
  onClick,
  fullWidth,
  isLoading,
  disabled,
  href,
  withoutBorder,
  icon,
}) => {
  const btnClassnames = classNames(
    'app-btn block px-5 text-white text-[14px] rounded-[150px] whitespace-nowrap',
    {
      'h-9 px-7': size === 'sm',
      'h-[44px] font-bold  px-10': size === 'md',
      'h-[64px] text-[18px] font-bold': size === 'lg',
      'btn-outline-blue': btnStyle === 'outline-blue',
      'btn-outline-red': btnStyle === 'outline-red',
      'btn-solid-blue': btnStyle === 'solid-blue',
      'w-full': fullWidth,
      '!border-none': withoutBorder,
    }
  );

  if (href) {
    return (
      <Link
        to={href}
        className={`${btnClassnames} flex gap-2 justify-center items-center self-start`}
      >
        {icon ? ICONS[icon] : null}
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={btnClassnames}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div
          className={classNames('flex justify-center items-center absolute', {
            'left-2/4': fullWidth,
          })}
        >
          <FadeLoader
            color="currentColor"
            height={6}
            margin={-10}
            width={1.25}
          />
        </div>
      ) : (
        <div className="flex gap-3 justify-center items-center">
          {icon ? ICONS[icon] : null}
          {text}
        </div>
      )}
    </button>
  );
};

export default CustomButton;
