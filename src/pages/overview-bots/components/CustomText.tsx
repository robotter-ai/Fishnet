import React from 'react';

interface ICustomTextProps {
  text: string;
  toolTipText?: string;
  showOptText?: boolean;
  xtraStyle?: string;
}

const CustomText: React.FC<ICustomTextProps> = ({
  text,
  toolTipText,
  showOptText,
  xtraStyle,
}) => {
  return (
    <p
      className={`flex-[3] text-sm font-normal text-dark-200 leading-none w-fit ${
        xtraStyle ? xtraStyle : ''
      }`}
    >
      {text}{' '}
      {showOptText && (
        <span className="text-light-400 text-xs uppercase">
          {'(Optional) '}
        </span>
      )}
      <span id='question_mark_sign' className="relative w-[0.65625rem] h-[0.65625rem] text-light-400 border border-light-400 rounded-[50%] cursor-default px-1 ml-1 text-xs">
        ?
        <span className="bg-[#555] w-24 text-white text-xs text-center rounded-md p-1 absolute z-10 bottom-[125%] opacity-0 transition-opacity">
          {toolTipText ? toolTipText : text}
        </span>
      </span>
    </p>
  );
};

export default CustomText;
