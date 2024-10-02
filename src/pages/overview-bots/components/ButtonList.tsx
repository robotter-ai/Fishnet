import { MdOutlineCheckCircle } from 'react-icons/md';
import { useState } from 'react';

interface IButtonListProps {
  btnData: {
    name: string;
    isChecked: boolean | null;
  }[];
  btnStyle?: string;
  activeStyle?: string;
}

const ButtonList: React.FC<IButtonListProps> = ({
  btnData,
  btnStyle,
  activeStyle,
}) => {
  const [index, setIndex] = useState(1);

  const handleOnClick = (idx: number) => {
    setIndex(idx);
  };

  return (
    <div className="flex gap-x-4 items-center">
      {btnData.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-center border border-transparent rounded-[41px] text-blue-200 cursor-pointer transition-all w-[7.25rem] h-[2.25rem] text-sm gap-x-1 ${
            btnStyle ? btnStyle : ''
          } ${
            item.isChecked !== null
              ? item.isChecked
                ? 'border-green-100 bg-transparent text-green-100'
                : 'border-blue-300 bg-light-200 text-blue-300'
              : ''
          } ${
            index === idx && !item.isChecked
              ? `${activeStyle ? activeStyle : ''}`
              : ''
          }`}
          onClick={() => handleOnClick(idx)}
        >
          {item.isChecked && <MdOutlineCheckCircle />}
          <span className={`text-sm ${item.isChecked ? 'text-green-100' : ''}`}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
