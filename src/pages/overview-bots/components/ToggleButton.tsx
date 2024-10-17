import React, { useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';

interface ToggleProps {
  state?: boolean;
  size?: 'lg' | 'sm';
  toggleState: (state: boolean, key?: string) => void;
}

const ToggleButton: React.FC<ToggleProps> = ({
  state = false,
  size = 'lg',
  toggleState,
}) => {
  const [isOn, setIsOn] = useState(state);

  const toggle = () => {
    setIsOn(!isOn);
    toggleState(!isOn);
  };

  return (
    <div
      className={`${
        size === 'lg' ? 'w-[2.125rem] h-[20px]' : 'w-7 h-[16px]'
      } flex items-center rounded-[100px] p-1 cursor-pointer ${
        isOn ? 'bg-blue-200' : 'bg-gray-300'
      }`}
      onClick={toggle}
    >
      <div
        className={`flex justify-center items-center ${
          isOn ? 'bg-light-200' : 'bg-white'
        } ${
          size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
        } rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? 'translate-x-[0.65rem]' : ''
        }`}
      >
        {isOn ? <IoIosCheckmark className="text-blue-200 font-bold" /> : null}
      </div>
    </div>
  );
};

export default ToggleButton;
