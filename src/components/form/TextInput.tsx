import { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';

interface TextInputProps {
  label?: string | React.ReactNode;
  type?: HTMLInputTypeAttribute;
  size?: 'sm' | 'md' | 'lg';
  placeholder: string;
  fullWidth?: boolean;
  bgColor?: '#fff' | '#F6F8FB' | '#0093A714';
  value?: any;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  disabled?: boolean;
  trail?: string;
  mandatory?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  bgColor = '#fff',
  size,
  fullWidth,
  placeholder,
  value,
  onChange,
  disabled,
  trail,
  mandatory,
}) => {
  return (
    <label
      className={classNames('relative', {
        'w-full': fullWidth,
      })}
    >
      {label ? <span className="text-[#29324A] text-sm">{label}</span> : null}
      <input
        type={type}
        className={classNames(
          `bg-[${bgColor}] py-3 px-4 mt-1 outline-none border text-sm rounded-full`,
          {
            'border-danger': mandatory && value === '',
            'border-transparent focus:border-primary': !mandatory || value !== '',
            'w-full': fullWidth,
            'h-9': size === 'sm',
            'h-[44px]': size === 'md',
            'h-[64px] px-6': size === 'lg',
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {trail ? (
        <span className="absolute top-[38px] right-6 text-dark-20">
          {trail}
        </span>
      ) : null}
    </label>
  );
};

export default TextInput;
