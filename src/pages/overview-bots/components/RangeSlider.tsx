import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import '@assets/styles/slider.scss';

interface IRangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number,
  max: number,
  minLabel?: string;
  maxLabel?: string;
  onRangeChange: (value: number) => void;
}

const RangeSlider: React.FC<IRangeSliderProps> = ({
  min,
  max,
  minLabel,
  maxLabel,
  onRangeChange,
  ...rest
}) => {
  const [value, setValue] = useState(0);

  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` };
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    setValue(value);
    onRangeChange(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center text-light-400 text-[0.625rem] px-2">
        <p>{minLabel ? minLabel : min}</p>
        <p>{maxLabel ? maxLabel : max}</p>
      </div>
      <input
        {...rest}
        type="range"
        min={min}
        max={max}
        onChange={onChange}
        style={getBackgroundSize()}
        value={value}
      />
    </div>
  );
};

export default RangeSlider;
