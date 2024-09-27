import { ArrowDown2Icon, ArrowUp2Icon } from '@assets/icons';
import React, { useEffect, useRef, useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    placeholder ? 'Select an option' : options[0].label
  );
  const lastIdx = options.length - 1;

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    onSelect(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropDownRef}
      className="relative w-full h-[2.25rem]"
    >
      <div
        className={`px-4 py-2 rounded-[100px] bg-light-200 text-blue-400 border border-transparent text-sm cursor-pointer flex items-center justify-between ${
          isOpen ? 'border-blue-300' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
        {isOpen ? <ArrowUp2Icon /> : <ArrowDown2Icon />}
      </div>

      {isOpen && (
        <div className="absolute w-full bg-dark-blue text-light-200 py-3 px-4 rounded-[22px] mt-2 max-h-60 overflow-y-auto z-10">
          {options.map((option, idx) => (
            <div
              key={option.value}
              className={`text-sm p-2 font-normal border-b border-chart-200 hover:bg-light-200 hover:text-chart-200 cursor-pointer ${
                lastIdx === idx ? 'border-none' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
