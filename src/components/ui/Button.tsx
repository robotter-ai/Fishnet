import classNames from 'classnames';

interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  btnStyle?: 'outline-blue' | 'outline-red';
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  text,
  size = 'sm',
  btnStyle,
  onClick,
  fullWidth,
  isLoading,
  disabled,
  children,
}) => {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={classNames(
        'app-btn px-7 text-white text-[14px] rounded-[10px]',
        {
          'h-[32px]': size === 'sm',
          'h-[44px]': size === 'md',
          'h-[60px] text-[18px] font-bold': size === 'lg',
          'btn-outline-blue': btnStyle === 'outline-blue',
          'btn-outline-red': btnStyle === 'outline-red',
          'w-full': fullWidth,
        }
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      data-testid={`button-${text}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
