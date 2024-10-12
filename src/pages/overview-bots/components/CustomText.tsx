import React, { useEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';

interface ICustomTextProps {
  index?: number;
  length?: number;
  text: string;
  toolTipText?: string | null;
  showOptText?: boolean;
  hasQuestionMark?: boolean;
  xtraStyle?: string;
}

type ToolTipType = { [key: string]: boolean };

const CustomText: React.FC<ICustomTextProps> = ({
  index,
  length = 0,
  text,
  toolTipText,
  showOptText,
  hasQuestionMark = true,
  xtraStyle,
}) => {
  const arrayOfNum = Array.from({ length }).map((_, idx) => [idx, false]);
  const obj = Object.fromEntries(arrayOfNum);
  const [showToolTip, setShowToolTip] = useState<ToolTipType>(obj);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleToolTipToggle = () => {
    setShowToolTip((prevState) => {
      const updatedState = Object.keys(prevState).reduce(
        (acc: ToolTipType, curr) => {
          acc[curr] = false;
          return acc;
        },
        {}
      );

      updatedState[`${index}`] = !prevState[`${index}`];
      return updatedState;
    });
  };

  useEffect(() => {
    const handleClickOutSide = (evt: MouseEvent) => {
      if (spanRef.current && !spanRef.current.contains(evt.target as Node)) {
        setShowToolTip(obj);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className="relative">
      <p
        className={`flex-[3] text-sm font-normal text-dark-200 leading-none w-fit ${
          xtraStyle || ''
        }`}
      >
        {text}{' '}
        {showOptText && (
          <span className="text-light-400 text-xs uppercase">
            {'(Optional) '}
          </span>
        )}
        {hasQuestionMark && (
          <span
            ref={spanRef}
            id="question_mark_sign"
            className="m-0 w-[0.65625rem] h-[0.65625rem] text-light-400 border border-light-400 rounded-[50%] cursor-pointer px-1 ml-1 text-xs"
            onClick={handleToolTipToggle}
          >
            ?
          </span>
        )}
      </p>
      {showToolTip[`${index}`] && <Tooltip text={toolTipText || text} />}
    </div>
  );
};

export default CustomText;
