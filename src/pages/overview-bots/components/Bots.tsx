import React from 'react';
import { IBotData, ITab, ITabs } from '../hooks/useProfile';
import CustomButton from '@components/ui/Button';
import MiniLineChart from './MiniLineChart';
import CustomTabs from './CustomTabs';
import { SetURLSearchParams } from 'react-router-dom';
import useTransaction from '@shared/hooks/useTransaction';

interface IBotsProps {
    botsData: IBotData[] | null;
    timeTabs: ITabs[];
    timeQuery: ITab;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}

const Bots: React.FC<IBotsProps> = ({
    botsData,
    timeTabs,
    timeQuery,
    searchParams,
    setSearchParams,
  }) => {
    const { deposit, withdraw } = useTransaction();
    const headers = ['BOT', 'STATUS', 'P&L', 'PORTFOLIO', 'ACCURACY', 'SHARPE RATIO', 'APR', ''];

    return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Trading bots list</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              {['Best', 'Worst', 'OTN', 'SOL', 'BTC', 'USDC'].map((tab) => (
                <button key={tab} className="text-blue-400 hover:text-blue-600">{tab}</button>
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
            onClick={() => deposit(1, 'rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Bot
          </button>
          <table className="w-full">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} className="text-left py-2 text-gray-500">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {botsData?.map((bot, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{bot.name}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-white ${bot.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {bot.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <span className={bot.pnl.isPositive ? 'text-green-500' : 'text-red-500'}>
                        {bot.pnl.isPositive ? '+' : '-'} ${bot.pnl.value} ({bot.pnl.percentage}%)
                      </span>
                      <MiniLineChart
                        data={bot.pnl.chartData}
                        color={bot.pnl.isPositive ? '#218358' : '#CE2C31'}
                      />
                    </div>
                  </td>
                  <td>${bot.portfolio.value} ({bot.portfolio.percentage}%)</td>
                  <td>{bot.accuracy}%</td>
                  <td>{bot.sharpeRatio}</td>
                  <td>{bot.apr}%</td>
                  <td>
                    <div className="flex space-x-2">
                      <CustomButton 
                        text="Withdraw" 
                        style={{ background: 'transparent', color: 'blue' }} 
                        onClick={() => withdraw(bot.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <CustomButton text="1" style={{ background: 'blue', color: 'white' }} />
            <CustomButton text="2" style={{ background: 'transparent', color: 'blue' }} />
            <CustomButton text="3" style={{ background: 'transparent', color: 'blue' }} />
            <CustomButton text="..." style={{ background: 'transparent', color: 'blue' }} />
          </div>
        </div>
      );
};

export default Bots;