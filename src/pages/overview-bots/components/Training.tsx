import {
  ICardBotData,
  IResultStrat,
  ITab,
  ITabs,
  ITimeTab,
} from '../hooks/useProfile';
import { SetURLSearchParams } from 'react-router-dom';
import { MdOutlineCheckCircle } from 'react-icons/md';
import CustomButton from '@components/ui/Button';
import React, { useState } from 'react';
import Stepper from './Stepper';
import { BackIcon } from '@assets/icons';
import Switcher from './Switcher';
import CustomDropdown from './CustomDropdown';
import RangeSlider from './RangeSlider';
import CustomText from './CustomText';
import CardBot from './CardBot';
import Pagination from './Pagination';
import CandlestickChart from './CandlestickChart';
import { CandlestickSeries } from 'react-financial-charts';
import CustomDatePicker from './CustomDatePicker';
import ButtonList from './ButtonList';
import CustomBtn from '@components/ui/CustomBtn';
import GoBack from './GoBack';
import LineTab from './LineTab';

export interface ITrainingProps {
  timeQuery: ITimeTab;
  resultStatTab: ITabs[];
  timeTabs: ITabs[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  cardBotData: ICardBotData[];
  resultStatQuery: IResultStrat;
  bigStatTable: string[][];
}

const Training: React.FC<ITrainingProps> = ({
  timeQuery,
  resultStatQuery,
  bigStatTable,
  resultStatTab,
  timeTabs,
  searchParams,
  setSearchParams,
  cardBotData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [index, setIndex] = useState(2);
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

  const getIndexCallback = (idx: number) => {
    setIndex(idx);
  };

  const onRangeChange = (rangeValue: number) => setValue(rangeValue);

  return (
    <div>
      <div
        id="training_header"
        className="flex flex-col md:flex-row gap-y-12 md:gap-y-3 justify-between items-center mt-8"
      >
        <div className="flex flex-col md:flex-row gap-y-4 lg:gap-y-0 md:gap-x-3 w-full">
          <GoBack />
          <Stepper currentStep={currentStep} />
        </div>

        <CustomBtn
          text="Run Backtest"
          xtraStyles="!max-w-[20.3125rem] md:w-[30%]"
        />
      </div>

      <div className="flex items-center justify-between my-8 flex-wrap gap-y-4 md:gap-y-0">
        <h2 className="font-semibold text-2xl text-dark-300">
          Backtest strategy
        </h2>
        <div className="max-w-[20.25rem] w-[80%] h-[1.9375rem]">
          <Switcher
            keyQuery="time"
            query={timeQuery}
            tabs={timeTabs}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>

      <div
        id="main"
        className="flex flex-col lg:flex-row justify-between gap-y-8 lg:gap-y-0 lg:gap-x-4"
      >
        <div id="left" className="w-full">
          <div className="flex justify-between items-center text-sm border-y border-light-400 w-full lg:max-w-[41.875rem] h-[2.0625rem] mb-5">
            <h3 className="text-dark-200">Model name</h3>
            <h3 className="text-dark-300">SOL Big Brain</h3>
          </div>

          <div>
            <p className="uppercase text-xs font-semibold text-dark-200 mb-5">
              Adjust settings for each trading pair separately
            </p>
            <ButtonList btnData={solData} getIndexCallback={getIndexCallback} />
          </div>

          {index === 2 ? (
            <div
              id="sliders_n_dropdowns"
              className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6"
            >
              <div id="COL 1" className="col-span-2 md:col-auto">
                <CustomText
                  text={'Select Exchange'}
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <CustomDropdown options={options} onSelect={handleSelect} />
              </div>
              <div id="COL 2" className="hidden md:block"></div>
              <div id="COL 3" className="col-span-2 md:col-auto">
                <CustomText
                  text={'Select Trading Strategy'}
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <CustomDropdown options={options} onSelect={handleSelect} />
              </div>
              <div id="COL 4" className="col-span-2 md:col-auto">
                <CustomText
                  text={'Normalized value'}
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <div className="flex justify-between gap-x-4">
                  <p className="relative flex text-sm justify-start items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    {value}
                    <span className="absolute hidden md:block top-1/2 translate-y-[-50%] left-[-21px] w-[1.375rem] h-[3px] bg-light-200"></span>
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
              <div id="COL 5" className="col-span-2 md:col-auto">
                <CustomText
                  text={'Select Market trend'}
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <CustomDropdown options={options} onSelect={handleSelect} />
              </div>
              <div id="COL 6" className="col-span-2 md:col-auto">
                <CustomText
                  text={'Adjust the Selected Market Trend Level'}
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <div className="flex justify-between gap-x-4">
                  <p className="relative flex justify-start text-sm items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    65%
                    <span className="absolute hidden md:block top-1/2 translate-y-[-50%] left-[-21px] w-[1.375rem] h-[3px] bg-light-200"></span>
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
              <div id="COL 7" className="col-span-2 md:col-auto">
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
              <div id="COL 8" className="hidden md:block"></div>
              <div id="COL 9" className="col-span-2 md:col-auto">
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
              <div id="COL 10" className="col-span-2 md:col-auto">
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

              <CustomBtn
                text="Select Optimal Strategy"
                btnStyle="outline-primary"
                xtraStyles="!max-w-[11.625rem] !h-[1.9375rem] w-full !text-xs mt-6"
              />
            </div>
          ) : (
            <div>
              <LineTab
                keyQuery="resultStat"
                data={resultStatTab}
                query={resultStatQuery}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />

              <div id="table" className="mt-6">
                {bigStatTable.map((col, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 gap-4 border-b border-light-400 text-sm py-2 ${
                      i === 0 ? 'border-t' : ''
                    }`}
                  >
                    <p className="text-left text-dark-200">{col[0]}</p>
                    <p
                      className={`text-right text-dark-300 ${
                        i === 1 || i === 2
                          ? 'text-green-100'
                          : i === 3
                          ? 'text-red-100'
                          : ''
                      } flex gap-x-2 justify-end`}
                    >
                      {col[1]}
                    </p>
                  </div>
                ))}
              </div>

              <CustomBtn
                text="Edit Strategy"
                btnStyle="outline-primary"
                xtraStyles="!max-w-[7.75rem] !h-[1.9375rem] w-full !text-xs mt-6"
              />
            </div>
          )}
        </div>

        <div id="right" className="w-full">
          <CandlestickChart height={500} />
          <div>
            <CustomText
              text={'Select timespan for the Backtest'}
              xtraStyle="mb-5 font-semibold text-xs uppercase"
            />
            <div className="flex flex-col md:flex-row justify-between gap-y-4 md:gap-y-0 md:gap-x-4">
              <CustomDatePicker />
              <CustomDatePicker />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="font-semibold text-2xl text-dark-300">
          Previous backtests strategies with the model
        </h1>

        {/* CardBot */}
        <div className="mt-4 gap-x-5 justify-between overflow-x-auto flex lt:flex-col flex-row">
          {cardBotData.map((item, idx) => (
            <CardBot
              isEmpty={false}
              key={idx}
              cardBotData={item}
              xtraStyle="lt:flex-auto flex-none xl:flex-auto"
            />
          ))}
        </div>
      </div>

      <div className="md:w-[20rem] h-[1.9375rem] mx-auto">
        <Pagination />
      </div>
    </div>
  );
};

export default Training;
