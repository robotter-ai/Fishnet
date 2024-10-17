import { forwardRef, useEffect, useRef, useState } from 'react';

interface IToolTipProps {
  text: string;
  width?: string;
}

const Tooltip = forwardRef<HTMLDivElement, IToolTipProps>(
  ({ text, width }, ref) => {
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [leftOffset, setLeftOffset] = useState(0);
    const [isOverflow, setIsOverflow] = useState({ right: false, top: false });

    useEffect(() => {
      const adjustTooltipPosition = () => {
        const tooltip = tooltipRef.current;
        const parent = (
          ref as React.MutableRefObject<HTMLDivElement>
        )?.current?.parentElement?.getElementsByClassName(
          'scroll_container'
        )[0];

        if (tooltip && parent) {
          const tooltipRect = tooltip.getBoundingClientRect();
          const parentRect = parent.getBoundingClientRect();
          let newLeftOffset = 0;

          console.log('TOOL = ', tooltipRect, '\nPARENT = ', parentRect);

          // Check for top overflow
          // if (tooltipRect.top > parentRect.top) {
          //   newLeftOffset = -(tooltipRect.top - parentRect.top + 10); // move bottom
          // }
          if (tooltipRect.top < parentRect.top) {
            tooltip.style.top = `${35}px`; // Adjust the tooltip's position downwards
            setIsOverflow((prevState) => ({ ...prevState, top: true }));
          }

          // Check for right overflow
          if (tooltipRect.right > parentRect.right) {
            newLeftOffset = -(tooltipRect.right - parentRect.right + 10); // move left
            setIsOverflow((prevState) => ({ ...prevState, right: true }));
          }

          // Check for left overflow
          if (tooltipRect.left < parentRect.left) {
            newLeftOffset = parentRect.left - tooltipRect.left + 10; // move right
          }

          setLeftOffset(newLeftOffset);
        }
      };

      adjustTooltipPosition();

      window.addEventListener('resize', adjustTooltipPosition);

      return () => {
        window.removeEventListener('resize', adjustTooltipPosition);
      };
    }, [ref]);

    console.log(isOverflow);

    return (
      <div
        ref={tooltipRef}
        style={isOverflow.right ? { right: -16.5 } : { left: -25 }}
        className={`absolute bottom-8 z-50 ${
          width ? width : 'w-56'
        } p-4 text-xs text-white bg-dark-400 rounded-[20px] h-fit`}
      >
        {text}
        <div
          className={`absolute bottom-[-8px] ${
            isOverflow.right ? 'right-[12%]' : 'left-[30%]'
          } transform -translate-x-1/2 w-2 h-2 border-l-8 border-r-8 ${
            isOverflow.top
              ? 'border-b-8 border-b-dark-400 top-[-8px]'
              : 'border-t-8 border-t-dark-400'
          } border-transparent `}
        />
      </div>
    );
  }
);

export default Tooltip;
