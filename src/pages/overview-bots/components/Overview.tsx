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
import {
  NavigateOptions,
  SetURLSearchParams,
  URLSearchParamsInit,
} from 'react-router-dom';
import Performance from '../components/Performance';
import CustomBtn from '@components/ui/CustomBtn';
import CustomPieChart from './CustomPieChart';
import CryptoStats from './CryptoStats';
import StatsTable from './StatsTable';
import classNames from 'classnames';
import Switcher from './Switcher';
import PnLChart from './PnLChart';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@shared/hooks/useStore';
import LineTab from './LineTab';
import { useCreateInstanceMutation } from '@store/instance/api';

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
  const [isEmpty, setIsEmpty] = useState(true);
  const [createInstance, { isLoading }] = useCreateInstanceMutation();
  const { address } = useAppSelector((state) => state.auth);

  const handleCreateNewModel = useCallback(async () => {
    try {
      await createInstance({
        strategy_name: 'test',
        strategy_parameters: {},
        market: 'string',
      }).unwrap();
    } catch (e) {
      console.error('Failed to solve authentication challenge', e);
    }
  }, []);

  useEffect(() => {
    if (address) {
      setIsEmpty(false);
    }
  }, [address]);

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
          isLoading={isLoading}
          onClick={handleCreateNewModel}
        />
      </div>

      <LineTab
        keyQuery="date"
        data={dateTabs}
        query={dateQuery}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="flex flex-col xl:flex-row justify-between gap-x-4">
        <div id="left" className="w-full">
          <div className="overflow-x-auto lg:overflow-x-clip pb-2">
            <CryptoStats data={cryptoStats} isEmpty={isEmpty} />

            <div id="piechart_n_stats_table" className="flex gap-x-3 mt-5">
              <CustomPieChart
                isEmpty={isEmpty}
                size={210}
                innerRadius={90}
                outerRadius={103}
                cryptoStats={cryptoStats}
                label={
                  <>
                    <h1 className="font-bold text-[2rem] text-center text-dark-300">
                      ${isEmpty ? 0 : totalAmount(cryptoStats)}
                    </h1>
                    <p className="font-normal text-sm text-center text-dark-100">
                      Portfolio{' '}
                      {!isEmpty && (
                        <span className="text-green-100">(+20%)</span>
                      )}
                    </p>
                  </>
                }
              />

              <div className="flex flex-row md:flex-col lg:flex-row w-full gap-y-4 xl:gap-y-0 gap-x-3">
                <StatsTable
                  title="Statistics"
                  statsData={statsData}
                  isEmpty={isEmpty}
                />
                <StatsTable
                  title="Lock 450 OTN more to Save on FEES and COSTS"
                  statsData={statsDataOTN}
                  showBtn
                  isEmpty={isEmpty}
                />
              </div>
            </div>
          </div>

          <div id="time_tabs" className="mt-5 w-full">
            <div className="flex justify-between items-center mb-4 mt-10">
              <h2 className="font-semibold text-2xl text-dark-300">P&L</h2>
              {!isEmpty && (
                <div className="max-w-[20.25rem] w-[80%] h-[1.9375rem]">
                  <Switcher
                    keyQuery="time"
                    query={timeQuery}
                    tabs={timeTabs}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                </div>
              )}
            </div>

            {isEmpty ? (
              <div className="w-full h-[361px] rounded-[22px] bg-light-300"></div>
            ) : (
              <div className="overflow-x-auto xl:overflow-x-clip">
                <div className="w-[63.4375rem] lg:w-full">
                  <PnLChart height={459} minWidth={389} />
                </div>
              </div>
            )}
          </div>
        </div>

        <Performance
          isEmpty={isEmpty}
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
