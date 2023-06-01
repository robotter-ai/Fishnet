import { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';

interface TextInputProps {
  label: string | React.ReactNode;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  fullWidth?: boolean;
  bgColor?: '#fff' | '#F6F8FB';
  value?: any;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  bgColor = '#fff',
  fullWidth,
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  return (
    <label
      className={classNames({
        'w-full': fullWidth,
      })}
    >
      {label ? <span className="text-[#29324A]">{label}</span> : null}
      <input
        type={type}
        className={classNames(
          `bg-[${bgColor}] py-3 px-4 mt-2 rounded-lg outline-none border border-transparent focus:border-blue`,
          {
            'w-full': fullWidth,
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
};

export default TextInput;
