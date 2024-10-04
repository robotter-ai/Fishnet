import { ICardBotData, ITab, ITabs } from '../hooks/useProfile';
import { SetURLSearchParams } from 'react-router-dom';
import { MdOutlineCheckCircle } from 'react-icons/md';
import CustomButton from '@components/ui/Button';
import React, { useState } from 'react';
import Stepper from './Stepper';
import { BackIcon } from '@assets/icons';
import CustomTabs from './CustomTabs';
import CustomDropdown from './CustomDropdown';
import RangeSlider from './RangeSlider';
import CustomText from './CustomText';
import CardBot from './CardBot';
import Pagination from './Pagination';
import CandlestickChart from './CandlestickChart';

export interface ITrainingProps {
  timeQuery: ITab;
  timeTabs: ITabs[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  cardBotData: ICardBotData[];
}

const Training: React.FC<ITrainingProps> = ({
  timeQuery,
  timeTabs,
  searchParams,
  setSearchParams,
  cardBotData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [value, setValue] = React.useState(0);
  const solData = [
    { name: 'SOL/USDC', isChecked: true },
    { name: 'SOL/BNB', isChecked: true },
    { name: 'SOL/JUP', isChecked: false },
  ];

  const options = [
    { label: 'Binance', value: '1' },
    { label: 'Cube', value: '2' },
    { label: 'XRP Ledger', value: '3' },
    { label: 'Kujira', value: '4' },
    { label: 'Polka DEX', value: '5' },
    { label: 'Uniswap', value: '6' },
  ];

  const handleSelect = (value: string) => {
    console.log('Selected value:', value);
  };

  const onRangeChange = (rangeValue: number) => setValue(rangeValue);

  return (
    <div>
      <div
        id="training_header"
        className="flex flex-col md:flex-row gap-y-12 md:gap-y-3 justify-between items-center mt-8"
      >
        <div className="flex gap-x-3 w-full">
          <div
            id="go_back_arrow"
            className="flex gap-x-2 items-center cursor-pointer text-navy transition-all hover:translate-x-[-2px]"
          >
            <BackIcon />
            <h2 className="font-semibold text-xs text-navy">Back</h2>
          </div>

          <Stepper currentStep={currentStep} />
        </div>

        <div className="max-w-[20.3125rem] md:w-[30%] ">
          <CustomButton text="Run Backtest" btnStyle="solid-navy" fullWidth />
        </div>
      </div>

      <div className="flex items-center justify-between my-8">
        <h2 className="font-semibold text-2xl text-dark-300">
          Backtest strategy
        </h2>
        <div className="max-w-[20.25rem] w-[80%] h-[1.9375rem]">
          <CustomTabs
            isTab={false}
            query={timeQuery}
            tabs={timeTabs}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>

      <div id="main" className="flex flex-col lg:flex-row justify-between gap-y-8 lg:gap-y-0 lg:gap-x-4">
        <div id="left">
          <div className="flex justify-between items-center text-sm border-y border-light-400 w-full max-w-[41.875rem] h-[2.0625rem] mb-5">
            <h3 className="text-dark-200">Model name</h3>
            <h3 className="text-dark-300">SOL Big Brain</h3>
          </div>

          <div>
            <p className="uppercase text-xs font-semibold text-dark-200 mb-5">
              Adjust settings for each trading pair separately
            </p>
            <div className="flex gap-x-4 items-center">
              {solData.map((sol, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center  border  rounded-[41px] w-[7.25rem] h-[2.25rem] text-sm gap-x-1 ${
                    sol.isChecked
                      ? 'border-green-100 bg-transparent text-green-100'
                      : 'border-blue-300 bg-light-200 text-blue-300'
                  }`}
                >
                  {sol.isChecked && <MdOutlineCheckCircle />}
                  <span
                    className={`text-sm ${
                      sol.isChecked ? 'text-green-100' : ''
                    }`}
                  >
                    {sol.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            id="sliders_n_dropdowns"
            className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6"
          >
            <div id="COL 1">
              <CustomText
                text={'Select Exchange'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
              />
              <CustomDropdown options={options} onSelect={handleSelect} />
            </div>
            <div id="COL 2"></div>
            <div id="COL 3">
              <CustomText
                text={'Select Trading Strategy'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
              />
              <CustomDropdown options={options} onSelect={handleSelect} />
            </div>
            <div id="COL 4">
              <CustomText
                text={'Normalized value'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
              />
              <div className="flex justify-between gap-x-4">
                <p className="relative flex text-sm justify-start items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                  {value}
                  <span className="absolute block top-1/2 translate-y-[-50%] left-[-21px] w-[1.375rem] h-[3px] bg-light-200"></span>
                </p>
                <div className="w-full mt-[-5px]">
                  <RangeSlider
                    min={0}
                    max={1}
                    step={0.1}
                    onRangeChange={onRangeChange}
                  />
                </div>
              </div>
            </div>
            <div id="COL 5">
              <CustomText
                text={'Select Market trend'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
              />
              <CustomDropdown options={options} onSelect={handleSelect} />
            </div>
            <div id="COL 6">
              <CustomText
                text={'Adjust the Selected Market Trend Level'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
              />
              <div className="flex justify-between gap-x-4">
                <p className="relative flex justify-start text-sm items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                  65%
                  <span className="absolute block top-1/2 translate-y-[-50%] left-[-21px] w-[1.375rem] h-[3px] bg-light-200"></span>
                </p>
                <div className="w-full mt-[-5px]">
                  <RangeSlider
                    min={1}
                    max={100}
                    minLabel="1%"
                    maxLabel="100%"
                    onRangeChange={onRangeChange}
                  />
                </div>
              </div>
            </div>
            <div id="COL 7" className="">
              <CustomText
                text={'Set Leverage'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
              />
              <div className="flex justify-between gap-x-4">
                <p className="flex text-xs justify-start items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                  x4
                </p>
                <div className="w-full mt-[-5px]">
                  <RangeSlider
                    min={0}
                    max={5}
                    minLabel="0"
                    maxLabel="x5"
                    onRangeChange={onRangeChange}
                  />
                </div>
              </div>
            </div>
            <div id="COL 8"></div>
            <div id="COL 9">
              <CustomText
                text={'Take PROFIT, +% from initial'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
                showOptText
              />
              <div className="flex justify-between gap-x-4">
                <p className="flex justify-start items-center text-xs px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                  +20%
                </p>
                <div className="w-full mt-[-5px]">
                  <RangeSlider
                    min={1}
                    max={1000}
                    minLabel="1%"
                    maxLabel="1000%"
                    onRangeChange={onRangeChange}
                  />
                </div>
              </div>
            </div>
            <div id="COL 10">
              <CustomText
                text={'Stop Loss, -% from initial'}
                xtraStyle="mb-5 font-semibold text-xs uppercase"
                showOptText
              />
              <div className="flex justify-between gap-x-4">
                <p className="flex justify-start text-sm items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                  -10%
                </p>
                <div className="w-full">
                  <RangeSlider
                    min={1}
                    max={100}
                    minLabel="-1%"
                    maxLabel="-100%"
                    onRangeChange={onRangeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="right" className='flex-1'>
          <CandlestickChart />
        </div>
      </div>

      <CustomButton
        text="Select Optimal Strategy"
        style={{ background: 'transparent' }}
        xtraStyles="flex justify-center items-center py-1 mt-6 text-xs text-navy border border-navy w-[11.625rem] h-[1.9375rem] transition-colors duration-300 hover:!bg-navy hover:!text-white"
      />

      <div className="mt-5">
        <h1 className="font-semibold text-2xl text-dark-300">
          Previous backtests strategies with the model
        </h1>

        {/* CardBot */}
        <div className="mt-4 flex flex-col md:flex-row gap-x-5 justify-between">
          {cardBotData.map((item, idx) => (
            <CardBot key={idx} cardBotData={item} />
          ))}
        </div>
      </div>

      <div className="w-[20rem] h-[1.9375rem] mx-auto">
        <Pagination />
      </div>
    </div>
  );
};

export default Training;
