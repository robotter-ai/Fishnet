import { MdOutlineCheckCircle } from 'react-icons/md';
import { useState } from 'react';

interface IButtonListProps {
  btnData: {
    name: string;
    isChecked: boolean | null;
  }[];
  btnStyle?: string;
  getTradePair: (pair: string) => void;
}

const ButtonList: React.FC<IButtonListProps> = ({
  btnData,
  btnStyle,
  getTradePair,
}) => {
  const [index, setIndex] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const handleOnClick = (idx: number, pair: string) => {
    setIndex(idx);
    getTradePair(pair);
  };

  return (
    <div className="flex gap-x-4 items-center">
      {btnData.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-center border border-transparent rounded-[41px] bg-light-200 text-blue-200 cursor-pointer transition-all w-[7.25rem] h-[2.25rem] text-sm gap-x-1 hover:border-blue-200/50 ${
            btnStyle || ''
          }  ${
            index === idx
              ? `!text-blue-300 border-blue-300 hover:border-blue-300`
              : ''
          } ${isSaved ? 'border-green-100 bg-transparent text-green-100' : ''}`}
          onClick={() => handleOnClick(idx, item.name)}
        >
          {isSaved && <MdOutlineCheckCircle />}
          <span className={`text-sm ${isSaved ? 'text-green-100' : ''}`}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
