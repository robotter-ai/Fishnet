import { HiLink } from 'react-icons/hi';

const ToggleButton = ({
  checked,
  onChange = () => {},
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <label className="toggle">
      <input
        className="toggle__input"
        name=""
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="toggle__fill" />
      <div className="toggle__link">
        <HiLink />
      </div>
    </label>
  );
};

export default ToggleButton;
