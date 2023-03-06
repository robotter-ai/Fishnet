interface CheckBoxProps {
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label }) => {
  return (
    <div>
      <label className="flex items-center gap-1 checkbox">
        <input type="checkbox" />
        <div className="checkbox__fill" />
        {label ? <span>{label}</span> : null}
      </label>
    </div>
  );
};

export default CheckBox;
