import { HiLink } from 'react-icons/hi';

const ToggleButton = () => {
  return (
    <label className="toggle">
      <input className="toggle__input" name="" type="checkbox" />
      <div className="toggle__fill" />
      <div className="toggle__link">
        <HiLink />
      </div>
    </label>
  );
};

export default ToggleButton;
