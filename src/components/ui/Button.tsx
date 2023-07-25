import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  btnStyle?: 'outline-blue' | 'outline-red' | 'usdc-blue';
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  linkTo?: string;
  fullWidth?: boolean;
  withoutBorder?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  type = 'button' || 'download',
  text,
  size = 'sm',
  btnStyle,
  onClick,
  fullWidth,
  isLoading,
  disabled,
  children,
  linkTo,
  withoutBorder,
}) => {
  const btnClassnames = classNames(
    'app-btn block px-7 text-white text-[14px] rounded-[150px]',
    {
      'h-[32px]': size === 'sm',
      'h-[44px] font-bold': size === 'md',
      'w-[191px] h-[44px] font-bold': size === 'md',
      'h-[64px] text-[18px] font-bold': size === 'lg',
      'btn-outline-blue': btnStyle === 'outline-blue',
      'btn-outline-red': btnStyle === 'outline-red',
      'btn-usdc-blue': btnStyle === 'usdc-blue',
      'w-full': fullWidth,
      '!border-none': withoutBorder,
    }
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`${btnClassnames} flex justify-center items-center`}
      >
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
        children || text
      )}
    </button>
  );
};

export default CustomButton;
