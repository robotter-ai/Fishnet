import React, { forwardRef, useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';

interface ICustomTextProps {
  text: string;
  toolTipText?: string | null;
  showOptText?: boolean;
  hasQuestionMark?: boolean;
  xtraStyle?: string;
  toolTipWidth?: string;
}

type ToolTipType = { [key: string]: boolean };

const CustomText = forwardRef<HTMLDivElement, ICustomTextProps>(
  (
    {
      text,
      toolTipText,
      showOptText,
      hasQuestionMark = true,
      xtraStyle,
      toolTipWidth,
    },
    ref
  ) => {
    const [showToolTip, setShowToolTip] = useState(false);
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleToolTipToggle = () => {
      setShowToolTip((prev) => !prev);
    };

    useEffect(() => {
      const handleClickOutside = (evt: MouseEvent) => {
        if (spanRef.current && !spanRef.current.contains(evt.target as Node)) {
          setShowToolTip(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <p
        className={`flex items-center gap-x-1 text-sm font-normal text-dark-200 leading-none w-fit ${xtraStyle}`}
      >
        {text}
        {showOptText && (
          <span className="text-light-400 text-xs uppercase">(Optional)</span>
        )}
        {hasQuestionMark && (
          <div className="relative">
            <span
              ref={spanRef}
              className="w-4 h-4 text-light-400 border border-light-400 rounded-full cursor-pointer text-xs flex items-center justify-center"
              onClick={handleToolTipToggle}
            >
              ?
            </span>
            {showToolTip && (
              <Tooltip
                ref={ref}
                text={toolTipText || text}
                width={toolTipWidth}
              />
            )}
          </div>
        )}
      </p>
    );
  }
);

export default CustomText;
