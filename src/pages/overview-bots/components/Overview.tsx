import { ICardBotData, ICryptoStats, IDateTabs, IStatsTableData, ITab, ITabs } from '../hooks/useProfile';
import { totalAmount } from '../../../utils/formatMoney.util';
import { SetURLSearchParams } from 'react-router-dom';
import Performance from '../components/Performance';
import { DownIcon, UpIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomPieChart from './CustomPieChart';
import CustomTabs from './CustomTabs';
import PnLChart from './PnLChart';
import StatsTable from './StatsTable';
import classNames from 'classnames';
import React from 'react';

interface IOverviewProps {
  dateTabs: IDateTabs[];
  dateQuery: string;
  timeQuery: ITab;
  perfQuery: ITab;
  timeTabs: ITabs[];
  perfTabs: ITabs[];
  statsData: IStatsTableData[]
  statsDataOTN: IStatsTableData[]
  cryptoStats: ICryptoStats[]
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  cardBotData: ICardBotData[]
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
      <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-3 justify-between items-center mt-5">
        <h2 className="font-semibold text-2xl">Performance Summary</h2>
        <div className="w-[20.3125rem]">
          <CustomButton
            text="Create New Model"
            btnStyle="solid-navy"
            fullWidth
          />
        </div>
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

      <div className="flex flex-col lg:flex-row justify-between gap-x-4">
        <div id="left" className="w-full">
          <div className="mt-5 flex items-center gap-x-8">
            {cryptoStats.map((stats, i) => (
              <div key={i} className="flex items-center gap-x-3">
                <span
                  style={{ background: stats.color }}
                  className={`w-4 h-4 rounded-full`}
                ></span>
                <span>
                  <h2 className="text-dark-300 font-normal text-base mb-1">
                    ${stats.amount}
                  </h2>
                  <h2 className="text-dark-100 font-normal text-xs">
                    {stats.tag}
                  </h2>
                </span>
                <div
                  className={classNames(
                    'flex justify-center items-center min-w-[3.8125rem] h-[1.4375rem] bg-green-100 rounded-lg px-2 pt-[3px] gap-x-1',
                    { 'bg-red-100': i === 2 }
                  )}
                >
                  {i === 2 ? <DownIcon /> : <UpIcon />}
                  <h2 className="font-semibold text-base text-white">
                    {stats.percentage}%
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div id="piechart_n_stats_table" className="flex gap-x-3">
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
              <div className="flex flex-row md:flex-col xl:flex-row w-full gap-y-4 xl:gap-y-0 xl:gap-x-3">
                <StatsTable title="Statistics" statsData={statsData} />
                <StatsTable
                  title="Lock 450 OTN more to Save on FEES and COSTS"
                  statsData={statsDataOTN}
                  showBtn
                />
              </div>
            </div>

            <div id="time_tabs" className="mt-5">
              <div className="flex justify-between items-center mb-4 mt-10">
                <h2 className="font-semibold text-2xl text-dark-300">P&L</h2>
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
              <PnLChart />
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
