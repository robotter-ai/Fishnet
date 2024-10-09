import classNames from 'classnames';
import React from 'react';

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Backtest Strategy', 'Results', 'Connect', 'Balance'];

  return (
    <div className="flex items-center justify-between w-[80%] md:w-[90%] max-w-[25rem] mx-auto md:mx-0">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center relative">
          <div
            id="circle"
            className={`flex justify-center items-center w-[20px] h-[20px] rounded-full font-semibold text-xs ${
              currentStep === index + 1
                ? 'text-white bg-navy'
                : 'text-dark-200 bg-light-400'
            }`}
          >
            <span>{index + 1}</span>
          </div>
          <p
            id="step_text"
            className={classNames(
              'text-xs text-dark-300 absolute bottom-[-25px] md:whitespace-nowrap',
              {
                'text-navy': currentStep === index + 1,
                'bottom-[-41px] md:bottom-[-25px]': index === 0,
              }
            )}
          >
            {step}
          </p>

          {index < steps.length - 1 && (
            <div
              id="line"
              className="lt:w-[2.5rem] w-[5.5rem] md:w-[5.5rem] h-[1px] bg-light-400 absolute left-[30px] top-[10px] z-[-1]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
