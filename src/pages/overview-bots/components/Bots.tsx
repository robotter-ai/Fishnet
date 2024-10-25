import React, { useState } from 'react';
import CustomButton from '@components/ui/Button';
import { SetURLSearchParams } from 'react-router-dom';
import useTransaction from '@shared/hooks/useTransaction';
import { useAppSelector } from '@shared/hooks/useStore';
import MiniLineChart from './MiniLineChart';
import {
  IBotData,
  ICardBotData,
  IChatTab,
  ICryptoStats,
  IDateTab,
  ISolData,
  IStatsTableData,
  IStratTab,
  ITab,
  ITabs,
  ITimeTab,
} from '../hooks/useProfile';
import CustomTabs from './CustomTabs';
import SingleBotView from './BotView';

interface IBotsProps {
  solData: ISolData[];
  botsData: IBotData[] | null;
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
  handleOpenWalletModal: () => void;
}

const Bots: React.FC<IBotsProps> = ({
  botsData,
  timeTabs,
  stratTabs,
  tradeDateTabs,
  stratTable,
  infoTable,
  solData,
  chartTypeTabs,
  dateQuery,
  timeQuery,
  chartTypeQuery,
  tradeDateQuery,
  stratQuery,
  statsDataSOL,
  statsDataLock,
  cryptoStats,
  cardBotData,
  searchParams,
  setSearchParams,
  handleOpenWalletModal,
}) => {
  const { deposit, withdraw } = useTransaction();
  const headers = [
    'BOT',
    'STATUS',
    'P&L',
    'PORTFOLIO',
    'ACCURACY',
    'SHARPE RATIO',
    'APR',
    '',
  ];
  const [selectedBot, setSelectedBot] = useState<IBotData | null>(null);

  const handleBotClick = (bot: IBotData | undefined) => {
    if (!bot) return;

    setSelectedBot(bot);
  };

  if (selectedBot) {
    return (
      <SingleBotView
        bot={selectedBot}
        onBack={() => setSelectedBot(null)}
        onWithdraw={() => withdraw(selectedBot.id)}
        solData={solData}
        infoTable={infoTable}
        stratTable={stratTable}
        dateQuery={dateQuery}
        timeQuery={timeQuery}
        tradeDateQuery={tradeDateQuery}
        chartTypeQuery={chartTypeQuery}
        stratQuery={stratQuery}
        timeTabs={timeTabs}
        stratTabs={stratTabs}
        tradeDateTabs={tradeDateTabs}
        chartTypeTabs={chartTypeTabs}
        statsDataSOL={statsDataSOL}
        statsDataLock={statsDataLock}
        cryptoStats={cryptoStats}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        cardBotData={cardBotData}
      />
    );
  }

  const navigateToTraining = () => {
    setSearchParams({ tab: 'training' });
  };

  const { address } = useAppSelector((state) => state.auth);
  
  const handleCreateNewBot = () => {
    if (!address) {
      setSearchParams({ redirectToTraining: 'true' });
      handleOpenWalletModal();
    } else {
      navigateToTraining();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trading bots list</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {['Best', 'Worst', 'OTN', 'SOL', 'BTC', 'USDC'].map((tab) => (
            <button key={tab} className="text-blue-400 hover:text-blue-600">
              {tab}
            </button>
          ))}
        </div>
        <div className="w-64">
          <CustomTabs
            isTab={false}
            tabs={timeTabs}
            query={timeQuery}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>
      <button
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        onClick={handleCreateNewBot}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Create New Bot
      </button>
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="text-left py-2 text-gray-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {botsData?.map((bot, index) => (
            <tr
              key={index}
              className="border-b cursor-pointer"
              onClick={() =>
                handleBotClick(botsData.find((x) => x.id === bot.id))
              }
            >
              <td className="py-4">{bot.name}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    bot.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {bot.status}
                </span>
              </td>
              <td>
                <div className="flex items-center">
                  <span
                    className={
                      bot.pnl.isPositive ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {bot.pnl.isPositive ? '+' : '-'} ${bot.pnl.value} (
                    {bot.pnl.percentage}%)
                  </span>
                  <MiniLineChart
                    data={bot.pnl.chartData}
                    color={bot.pnl.isPositive ? '#218358' : '#CE2C31'}
                  />
                </div>
              </td>
              <td>
                ${bot.portfolio.value} ({bot.portfolio.percentage}%)
              </td>
              <td>{bot.accuracy}%</td>
              <td>{bot.sharpeRatio}</td>
              <td>{bot.apr}%</td>
              <td>
                <div className="flex space-x-2">
                  <CustomButton
                    text="Withdraw"
                    style={{ background: 'transparent', color: 'blue' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      withdraw(bot.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <CustomButton text="1" style={{ background: 'blue', color: 'white' }} />
        <CustomButton
          text="2"
          style={{ background: 'transparent', color: 'blue' }}
        />
        <CustomButton
          text="3"
          style={{ background: 'transparent', color: 'blue' }}
        />
        <CustomButton
          text="..."
          style={{ background: 'transparent', color: 'blue' }}
        />
      </div>
    </div>
  );
};

export default Bots;
