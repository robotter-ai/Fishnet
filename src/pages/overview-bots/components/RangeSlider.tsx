import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import '@assets/styles/slider.scss';

interface IRangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  value: number;
  minLabel?: string;
  maxLabel?: string;
}

const RangeSlider: React.FC<IRangeSliderProps> = ({
  min,
  max,
  value,
  minLabel,
  maxLabel,
  ...rest
}) => {
  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` };
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
        style={getBackgroundSize()}
        value={value}
      />
    </div>
  );
};

export default RangeSlider;
