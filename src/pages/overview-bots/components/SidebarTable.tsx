import React from 'react';
import { BiCopy } from 'react-icons/bi';

interface ISidebarTableProps {
  title: string;
  data: string[][];
  showIcon?: boolean;
}

const SidebarTable: React.FC<ISidebarTableProps> = ({
  title,
  data,
  showIcon,
}) => {
  return (
    <div className="w-full md:w-[20.3125rem] p-6 bg-light-200 rounded-[22px] mb-4 flex-none ">
      <h1 className="font-semibold text-xs text-center uppercase text-blue-400 mb-4">
        {title}
      </h1>
      <div>
        {data.map((col, i) => (
          <div
            key={i}
            className={`grid grid-cols-2 gap-4 border-b border-white text-sm py-2 ${
              i === 0 ? 'border-t' : ''
            }`}
          >
            <p className="text-left text-dark-200">{col[0]}</p>
            <p className="text-right text-dark-300 flex gap-x-2 justify-end">
              {col[1]}{' '}
              {i === 2 && showIcon && (
                <span className="w-6 h-6 flex justify-center items-center rounded-full text-blue-400 bg-blue-100 cursor-pointer transition-colors hover:bg-blue-200/30">
                  <BiCopy />
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarTable;
