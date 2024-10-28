import React, { useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { BackIcon } from '@assets/icons';
import CustomBtn from '@components/ui/CustomBtn';
import {
  ICardBotData,
  IChatTab,
  ICryptoStats,
  IDateTab,
  ISolData,
  IStatsTableData,
  IStratTab,
  ITabs,
  ITimeTab,
  IBotData,
} from '../hooks/useProfile';
import CandlestickChart from './CandlestickChart';
import CustomPieChart from './CustomPieChart';
import Switcher from './Switcher';
import PnLChart from './PnLChart';
import StatsTable from './StatsTable';
import ButtonList from './ButtonList';
import SidebarTable from './SidebarTable';
import TradeTable from './TradeTable';
import GoBack from './GoBack';
import CryptoStats from './CryptoStats';

const truncateDecimals = (value: number, decimalPlaces: number = 2): number => {
  const multiplier = 10 ** decimalPlaces;
  return Math.trunc(value * multiplier) / multiplier;
};

interface IBotViewProps {
  bot: IBotData;
  onBack: () => void;
  onWithdraw: () => void;
  solData: ISolData[];
  infoTable: string[][];
  stratTable: string[][];
  dateQuery: string;
  timeQuery: ITimeTab;
  tradeDateQuery: IDateTab;
  chartTypeQuery: IChatTab;
  stratQuery: IStratTab;
  timeTabs: ITabs[];
  stratTabs: ITabs[];
  tradeDateTabs: ITabs[];
  chartTypeTabs: ITabs[];
  statsDataSOL: IStatsTableData[];
  statsDataLock: IStatsTableData[];
  cryptoStats: ICryptoStats[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  cardBotData: ICardBotData[];
}

const SingleBotView: React.FC<IBotViewProps> = ({
  bot,
  onBack,
  onWithdraw,
  solData,
  infoTable,
  stratTable,
  dateQuery,
  timeQuery,
  tradeDateQuery,
  chartTypeQuery,
  stratQuery,
  timeTabs,
  stratTabs,
  tradeDateTabs,
  chartTypeTabs,
  statsDataSOL,
  statsDataLock,
  cryptoStats,
  searchParams,
  setSearchParams,
  cardBotData,
}) => {
  const getChartTypeQuery = searchParams.get('chart') || 'trades';

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between gap-x-4">
        <div id="left" className="w-full">
          <div className="flex gap-x-4 overflow-x-auto mt-6 pb-4">
            <div className="pt-3">
              <button
                onClick={onBack}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <BackIcon className="mr-2" />
                Go Back
              </button>
              <div className="mt-16">
                <CustomPieChart
                  isEmpty
                  size={210}
                  innerRadius={90}
                  outerRadius={103}
                  cryptoStats={cryptoStats}
                  label={
                    <>
                      <h1 className="font-bold text-[2rem] text-center text-dark-300">
                        {bot.pnl.isPositive ? '+' : '-'}$
                        {truncateDecimals(bot.pnl.value)}
                      </h1>
                      <p className="font-normal text-sm text-center text-dark-100">
                        {bot.pnl.isPositive ? '+' : '-'}
                        {truncateDecimals(bot.pnl.percentage)}% P&L
                      </p>
                    </>
                  }
                />
              </div>
            </div>

            <div className="flex-1">
              <CryptoStats data={cryptoStats} showValue isEmpty />

              <div className="flex flex-row md:flex-col lg:flex-row gap-y-4 xl:gap-y-0 gap-x-4 mt-8">
                <StatsTable
                  isEmpty
                  showActive
                  titleStyle="mb-4"
                  title="SOL BIG BRAIN"
                  statsData={statsDataSOL}
                  hasQuestionMark={false}
                />
                <StatsTable
                  isEmpty
                  titleStyle="mb-5"
                  title="Lock 450 OTN more to boost your bonus"
                  statsData={statsDataLock}
                  hasQuestionMark={false}
                  showBtn
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div id="time_tabs" className="mt-5 w-full">
              <div className="max-w-[24.625rem]  mt-10 mb-5">
                <ButtonList
                  btnStyle="bg-light-200 hover:border-blue-300/40"
                  btnData={solData}
                  getTradePair={function (pair: string): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-y-5 md:gap-y-0 justify-between items-center mb-4">
                <div className="max-w-[9.8125rem] w-[60%] h-[1.9375rem]">
                  <Switcher
                    keyQuery="chart"
                    query={chartTypeQuery}
                    tabs={chartTypeTabs}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                </div>

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

              <div className="overflow-x-auto xl:overflow-x-clip">
                <div className="h-auto w-[63.4375rem] lg:w-full">
                  {getChartTypeQuery === 'trades' && (
                    <CandlestickChart height={459} data={[]} />
                  )}
                  {getChartTypeQuery === 'pnl' && (
                    <PnLChart height={459} minWidth={408} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="right" className="flex-1">
          <div className="flex justify-center xl:justify-end my-8">
            <div className="max-w-[15.3125rem] w-full h-[1.9375rem]">
              <Switcher
                keyQuery="strat"
                query={stratQuery}
                tabs={stratTabs}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>

          <div className="gap-x-3 overflow-x-auto flex flex-col md:flex-row xl:flex-col">
            <SidebarTable title="information" data={infoTable} showIcon />
            <SidebarTable title="Strategy" data={stratTable} />
          </div>

          <div className="flex flex-col md:flex-row xl:flex-col justify-center items-center gap-x-4">
            <CustomBtn
              text="Edit Strategy"
              xtraStyles="max-w-[20.3125rem] w-full my-2"
            />

            <CustomBtn
              text="Withdraw"
              btnStyle="outline-secondary"
              xtraStyles="max-w-[20.3125rem] w-full my-2"
              onClick={onWithdraw}
            />
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-2xl text-dark-300 mt-8">
          List of Trades
        </h1>
        <div className="max-w-[14.6875rem] w-full h-[1.9375rem] my-6">
          <Switcher
            keyQuery="trade_date"
            query={tradeDateQuery}
            tabs={tradeDateTabs}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <TradeTable />
      </div>
    </>
  );
};

export default SingleBotView;
