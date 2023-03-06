import classNames from 'classnames';

interface TextInputProps {
  label: string | React.ReactNode;
  placeholder: string;
  fullWidth?: boolean;
  bgColor?: '#fff' | '#F6F8FB';
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  bgColor = '#fff',
  fullWidth,
  placeholder,
  onChange,
}) => {
  return (
    <label
      className={classNames({
        'w-full': fullWidth,
      })}
    >
      {label ? <span className="text-[#29324A]">{label}</span> : null}
      <input
        type="text"
        className={classNames(
          `bg-[${bgColor}] py-3 px-4 mt-2 rounded-lg outline-none border border-transparent focus:border-blue`,
          {
            'w-full': fullWidth,
          }
        )}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;
