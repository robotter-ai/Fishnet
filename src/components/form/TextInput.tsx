import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';

interface TextInputProps {
  label: string | React.ReactNode;
  type?: HTMLInputTypeAttribute;
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
  withRoundBorder?: boolean;
  inputType?: boolean;
  size?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  size = 'lg',
  bgColor = '#fff',
  fullWidth,
  placeholder,
  value,
  onChange,
  disabled,
  withRoundBorder,
  inputType,
}) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    // Regular expression to match only numbers and decimal inputs
    const regex = /^[0-9]*\.?[0-9]*$/;

    const inputValue = event.target.value;

    // Validate the input against the regular expression
    if (!regex.test(inputValue)) {
      event.preventDefault();
    }
  };
  return inputType ? (
    <label
      className={classNames({
        'w-full': fullWidth,
      })}
    >
      <div className="w-full relative flex items-center isolate">
        <input
          type={type}
          onInput={handleInput}
          className={classNames(
            `bg-[${bgColor}] px-6 py-5 rounded-lg outline-none border border-[#F6F8FB] focus:border-blue`,
            {
              'w-full': fullWidth,
              'rounded-[150px]': withRoundBorder,
              'py-3 px-4 text-sm': size === 'sm',
            }
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <p
          className={classNames(
            `text-[#91999C] font-normal absolute right-0 z-10 flex items-center justify-center mr-6`,
            {
              'text-sm': size === 'sm',
            }
          )}
        >
          {' '}
          USDC{' '}
        </p>
      </div>
    </label>
  ) : (
    <label
      className={classNames({
        'w-full': fullWidth,
      })}
    >
      {label ? <span className="text-[#29324A] text-sm">{label}</span> : null}
      <input
        type={type}
        className={classNames(
          `bg-[${bgColor}] py-3 px-4 mt-2 outline-none border border-transparent focus:border-blue text-sm rounded-[60px]`,
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
