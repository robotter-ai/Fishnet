import { SetURLSearchParams } from 'react-router-dom';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CustomBtn from '@components/ui/CustomBtn';
import { useGetHistoricalCandlesMutation } from '@store/market/api';
import { ClipLoader, FadeLoader } from 'react-spinners';
import {
  ICardBotData,
  IResultStrat,
  ITabs,
  ITimeTab,
} from '../hooks/useProfile';
import Stepper from './Stepper';
import Switcher from './Switcher';
import CustomDropdown from './CustomDropdown';
import RangeSlider from './RangeSlider';
import CustomText from './CustomText';
import CardBot from './CardBot';
import Pagination from './Pagination';
import CandlestickChart from './CandlestickChart';
import CustomDatePicker from './CustomDatePicker';
import ButtonList from './ButtonList';
import GoBack from './GoBack';
import LineTab from './LineTab';
import { transformData } from '../../../utils/transformData';
import { strategiesConfigData } from '../../../utils/strategyConfigData';

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
  const [historicalCandlesData, { isLoading, data, error }] =
    useGetHistoricalCandlesMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [index, setIndex] = useState(2);
  const pmm = 'pmmdynamiccontrollerconfig';

  const strategiesOpt = Object.keys(strategiesConfigData).map((key) => ({
    label: key,
    value: key,
  }));

  const [value, setValue] = React.useState({
    normalizeValue: 0.5,
    marketTrendLevel: 34,
    leverage: strategiesConfigData[pmm]?.leverage?.default || 0,
    stopLoss: strategiesConfigData[pmm]?.stop_loss?.default || 0,
    takeProfit: strategiesConfigData[pmm]?.take_profit?.default || 0,
  });
  const [tradePair, setTradePair] = useState('SOL-PERP');
  const [timeStamp, setTimeStamp] = useState({
    startTime: 1727771877,
    endTime: 1728376677,
  });

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
    const config = strategiesConfigData[value];
    setValue((prevState) => ({
      ...prevState,
      leverage: config?.leverage?.default ?? 0,
      stopLoss:
        (config?.stop_loss?.default ? +config?.stop_loss?.default : 0) ?? 0,
      takeProfit:
        (config?.take_profit?.default ? +config?.take_profit?.default : 0) ?? 0,
    }));
  };

  const getTradePair = (pair: string) => {
    setTradePair(pair);
  };

  const handleOnRangeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValue((prevState) => ({ ...prevState, [name]: +value }));
  };

  const startTimeUnix = (unix: number) => {
    setTimeStamp((prevState) => ({ ...prevState, startTime: unix }));
  };

  const endTimeUnix = (unix: number) => {
    setTimeStamp((prevState) => ({ ...prevState, endTime: unix }));
  };

  const handleCandleData = useCallback(async () => {
    try {
      await historicalCandlesData({
        connector_name: 'birdeye',
        trading_pair: tradePair,
        market_address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
        interval: '15m',
        start_time: timeStamp.startTime,
        end_time: timeStamp.endTime,
      });
    } catch (error) {
      console.log('TRY CATCH ERROR => ', error);
    }
  }, [tradePair, timeStamp]);

  useEffect(() => {
    handleCandleData();
  }, [tradePair, timeStamp]);

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
            <ButtonList btnData={solData} getTradePair={getTradePair} />
          </div>

          {index === 2 ? (
            <div
              id="sliders_n_dropdowns"
              className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6"
            >
              <div id="COL 1" className="col-span-2 md:col-auto">
                <CustomText
                  text="Select Exchange"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <CustomDropdown
                  options={options}
                  onSelect={() => {}}
                  placeholder="Select an Option"
                />
              </div>
              <div id="COL 2" className="hidden md:block" />
              <div id="COL 3" className="col-span-2 md:col-auto">
                <CustomText
                  text="Select Trading Strategy"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <CustomDropdown
                  options={strategiesOpt}
                  onSelect={handleSelect}
                />
              </div>
              <div id="COL 4" className="col-span-2 md:col-auto">
                <CustomText
                  text="Normalized value"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <div className="flex justify-between gap-x-4">
                  <p className="relative flex text-sm justify-start items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    {value.normalizeValue}
                    <span className="absolute hidden md:block top-1/2 translate-y-[-50%] left-[-21px] w-[1.375rem] h-[3px] bg-light-200" />
                  </p>
                  <div className="w-60 flex-1 mt-[-5px]">
                    <RangeSlider
                      name="normalizeValue"
                      min={0}
                      max={1}
                      step={0.1}
                      value={value.normalizeValue}
                      onChange={handleOnRangeChange}
                    />
                  </div>
                </div>
              </div>
              <div id="COL 5" className="col-span-2 md:col-auto">
                <CustomText
                  text="Select Market trend"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <CustomDropdown options={options} onSelect={() => {}} />
              </div>
              <div id="COL 6" className="col-span-2 md:col-auto">
                <CustomText
                  text="Adjust the Selected Market Trend Level"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <div className="flex justify-between gap-x-4">
                  <p className="relative flex justify-start text-sm items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    {value.marketTrendLevel}%
                    <span className="absolute hidden md:block top-1/2 translate-y-[-50%] left-[-21px] w-[1.375rem] h-[3px] bg-light-200" />
                  </p>
                  <div className="w-60 flex-1 mt-[-5px]">
                    <RangeSlider
                      name="marketTrendLevel"
                      min={1}
                      max={100}
                      minLabel="1%"
                      maxLabel="100%"
                      value={value.marketTrendLevel}
                      onChange={handleOnRangeChange}
                    />
                  </div>
                </div>
              </div>
              <div id="COL 7" className="col-span-2 md:col-auto">
                <CustomText
                  text="Set Leverage"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                />
                <div className="flex justify-between gap-x-4">
                  <p className="flex text-xs justify-start items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    x{value.leverage ?? 0}
                  </p>
                  <div className="w-60 flex-1 mt-[-5px]">
                    <RangeSlider
                      name="leverage"
                      min={0}
                      max={100}
                      minLabel="0"
                      maxLabel="x100"
                      value={value.leverage ? +value.leverage : 0}
                      onChange={handleOnRangeChange}
                    />
                  </div>
                </div>
              </div>
              <div id="COL 8" className="hidden md:block" />
              <div id="COL 9" className="col-span-2 md:col-auto">
                <CustomText
                  text="Take PROFIT, +% from initial"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                  showOptText
                />
                <div className="flex justify-between gap-x-4">
                  <p className="flex justify-start items-center text-xs px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    +{value.takeProfit}%
                  </p>
                  <div className="w-60 flex-1 mt-[-5px]">
                    <RangeSlider
                      name="takeProfit"
                      min={1}
                      max={1000}
                      step={0.01}
                      minLabel="1%"
                      maxLabel="1000%"
                      value={value.takeProfit ? +value.takeProfit : 0}
                      onChange={handleOnRangeChange}
                    />
                  </div>
                </div>
              </div>
              <div id="COL 10" className="col-span-2 md:col-auto">
                <CustomText
                  text="Stop Loss, -% from initial"
                  xtraStyle="mb-5 font-semibold text-xs uppercase"
                  showOptText
                />
                <div className="flex justify-between gap-x-4">
                  <p className="flex justify-start text-sm items-center px-4 w-[6.1875rem] h-[2.25rem] rounded-[100px] bg-light-200 text-blue-400">
                    -{value.stopLoss}%
                  </p>
                  <div className="w-60 flex-1">
                    <RangeSlider
                      name="stopLoss"
                      min={1}
                      max={100}
                      step={0.1}
                      minLabel="-1%"
                      maxLabel="-100%"
                      value={value.stopLoss ? +value.stopLoss : 0}
                      onChange={handleOnRangeChange}
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
          <div className="h-[500px] relative">
            {isLoading ? (
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 inset-x-auto">
                <FadeLoader color="#65636D" />
              </div>
            ) : (
              <CandlestickChart
                height={500}
                data={data ? transformData(data.data) : []}
              />
            )}
          </div>

          <div>
            <CustomText
              text="Select timespan for the Backtest"
              xtraStyle="mb-5 font-semibold text-xs uppercase"
            />
            <div className="flex flex-col md:flex-row justify-between gap-y-4 md:gap-y-0 md:gap-x-4">
              <CustomDatePicker getUnixTimeStamp={startTimeUnix} />
              <CustomDatePicker getUnixTimeStamp={endTimeUnix} />
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
