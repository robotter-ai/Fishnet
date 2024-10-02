import {
  ICardBotData,
  ICryptoStats,
  IDateTabs,
  IPerfTab,
  IStatsTableData,
  ITab,
  ITabs,
  ITimeTab,
} from '../hooks/useProfile';
import { totalAmount } from '../../../utils/formatMoney.util';
import { SetURLSearchParams } from 'react-router-dom';
import Performance from '../components/Performance';
import CustomBtn from '@components/ui/CustomBtn';
import CustomPieChart from './CustomPieChart';
import CryptoStats from './CryptoStats';
import StatsTable from './StatsTable';
import classNames from 'classnames';
import Switcher from './Switcher';
import PnLChart from './PnLChart';
import React from 'react';

interface IOverviewProps {
  dateTabs: IDateTabs[];
  dateQuery: string;
  timeQuery: ITimeTab;
  perfQuery: IPerfTab;
  timeTabs: ITabs[];
  perfTabs: ITabs[];
  statsData: IStatsTableData[];
  statsDataOTN: IStatsTableData[];
  cryptoStats: ICryptoStats[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  cardBotData: ICardBotData[];
}

const Overview: React.FC<IOverviewProps> = ({
  dateTabs,
  timeTabs,
  perfTabs,
  dateQuery,
  timeQuery,
  perfQuery,
  statsData,
  statsDataOTN,
  cryptoStats,
  cardBotData,
  searchParams,
  setSearchParams,
}) => {
  return (
    <>
      <div
        id="overview_header"
        className="flex flex-col md:flex-row gap-y-3 md:gap-y-3 justify-between items-center mt-5"
      >
        <h2 className="font-semibold text-2xl">Performance Summary</h2>
        <CustomBtn
          text="Create New Model"
          xtraStyles="max-w-[20.3125rem] w-[90%]"
        />
      </div>

      <div
        id="date_tabs"
        className="flex gap-x-6 border-b border-light-400 w-fit mt-5"
      >
        {dateTabs.map((item, i) => (
          <div
            key={i}
            className={classNames(
              'text-dark-20 cursor-pointer font-normal text-xs transition-colors duration-300 hover:text-dark',
              {
                '!text-blue-300 border-b !border-blue-300 pb-3':
                  item.key === dateQuery,
              }
            )}
            onClick={() => {
              searchParams.set('date', item.key);
              setSearchParams(searchParams);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-x-4">
        <div id="left" className="w-full">
          <div className="overflow-x-auto lg:overflow-x-clip pb-2">
            <CryptoStats data={cryptoStats} />

            <div id="piechart_n_stats_table" className="flex gap-x-3 mt-5">
              <CustomPieChart
                size={210}
                innerRadius={90}
                outerRadius={103}
                cryptoStats={cryptoStats}
                label={
                  <>
                    <h1 className="font-bold text-[2rem] text-center text-dark-300">
                      ${totalAmount(cryptoStats)}
                    </h1>
                    <p className="font-normal text-sm text-center text-dark-100">
                      Portfolio <span className="text-green-100">(+20%)</span>
                    </p>
                  </>
                }
              />

              <div className="flex flex-row md:flex-col lg:flex-row w-full gap-y-4 xl:gap-y-0 gap-x-3">
                <StatsTable title="Statistics" statsData={statsData} />
                <StatsTable
                  title="Lock 450 OTN more to Save on FEES and COSTS"
                  statsData={statsDataOTN}
                  showBtn
                />
              </div>
            </div>
          </div>

          <div id="time_tabs" className="mt-5 w-full">
            <div className="flex justify-between items-center mb-4 mt-10">
              <h2 className="font-semibold text-2xl text-dark-300">P&L</h2>
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
              <div className="w-[63.4375rem] lg:w-full">
                <PnLChart height={459} minWidth={389} />
              </div>
            </div>
          </div>
        </div>

        <Performance
          query={perfQuery}
          tabs={perfTabs}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          cardBotData={cardBotData}
        />
      </div>
    </>
  );
};

export default Overview;
