interface CheckBoxProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, onChange, checked }) => {
  return (
    <div>
      <label className="flex items-center gap-1 checkbox">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <div className="checkbox__fill" />
        {label ? <span>{label}</span> : null}
      </label>
    </div>
  );
};

export default CheckBox;
