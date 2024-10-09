import React from 'react';

interface IToolTipProps {
  text: string;
}

const Tooltip: React.FC<IToolTipProps> = ({ text }) => {
  return (
    <div className="absolute bottom-8 left-full -translate-x-[24%] z-50 transform w-56 p-4 text-xs text-white bg-dark-400 rounded-[20px]">
      {text}
      <div className="absolute bottom-[-8px] left-[20%] transform -translate-x-1/2 w-2 h-2 border-l-8 border-r-8 border-t-8 border-transparent border-t-dark-400" />
    </div>
  );
};

export default Tooltip;
