import { ICardBotData } from '../hooks/useProfile';
import { UpIcon, DownIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomPieChart from './CustomPieChart';
import MiniLineChart from './MiniLineChart';
import classNames from 'classnames';
import React from 'react';
import CustomBtn from '@components/ui/CustomBtn';

interface ICardBotProps {
  cardBotData: ICardBotData;
  xtraStyle?: string;
}

const CardBot: React.FC<ICardBotProps> = ({ cardBotData, xtraStyle }) => {
  return (
    <div
      id="card_bot"
      className={`relative lt:w-full lt:max-w-max max-w-[20.3125rem] w-full h-[11.9375rem] rounded-[22px] bg-light-200 border border-chart-300 p-4 mb-4 pt-[1.50rem] ${
        xtraStyle ? xtraStyle : ''
      }`}
    >
      <div className="">
        <div id="table" className="">
          {cardBotData.tableData.map((row, i) => (
            <div key={i} id="row" className="grid grid-cols-6 gap-x-2 mb-2">
              {i === 0 && (
                <>
                  <h2 className="text-xs col-span-2 font-bold text-dark-300 mb-3">
                    {cardBotData.name}
                  </h2>

                  <div className="mb-3 col-span-3">
                    <div className="flex">
                      <div id="P&L">
                        <h2
                          className={classNames(
                            'text-xs font-semibold text-green-100 m-0',
                            { 'text-red-100': !cardBotData.isPositive }
                          )}
                        >
                          {`${cardBotData.isPositive ? '+' : '-'} $${
                            cardBotData.rate
                          }`}
                        </h2>
                        <p className="text-[0.625rem] whitespace-nowrap text-dark-200 m-0">
                          P&L last week
                        </p>
                      </div>
                      {cardBotData.lineChartData && (
                        <div className="w-[3.375rem] h-auto">
                          <MiniLineChart
                            data={cardBotData.lineChartData}
                            color={
                              cardBotData.isPositive ? '#218358' : '#CE2C31'
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 flex justify-end">
                    <CustomBtn
                      text="View"
                      size="sm"
                      btnStyle="outline-primary"
                      xtraStyles="max-w-[2.75rem]"
                    />
                  </div>
                </>
              )}

              <div id="col1" className="flex-1 col-span-2">
                <h2 className="font-semibold text-xs text-dark-300">
                  {row.labelA[0]}%
                </h2>
                <p className="text-[0.625rem] text-dark-200 mt-0 leading-none">
                  {row.labelA[1]}
                </p>
              </div>

              <div
                id="col2"
                className="grid grid-cols-3 col-span-3 items-center gap-x-2 flex-1"
              >
                <div>
                  <h2 className="text-xs text-dark-300">{row.labelB[0]}</h2>
                  <p className="text-[0.625rem] text-dark-200 mt-[-2px] whitespace-nowrap">
                    {row.labelB[1]}
                  </p>
                </div>
                {row.percentage !== null && (
                  <div
                    id="tag"
                    className={classNames(
                      'flex justify-center items-center min-w-[2.625rem] h-[1.1875rem] bg-green-100 rounded-[6px] px-1 py-[2px] gap-x-1',
                      { 'bg-red-100': !row.isProfit }
                    )}
                  >
                    {row.isProfit ? <UpIcon /> : <DownIcon />}
                    <h2 className="font-semibold text-xs text-white">
                      {row.percentage}%
                    </h2>
                  </div>
                )}
              </div>

              {i === 0 && (
                <div className="absolute right-3 top-[4.5rem]">
                  <CustomPieChart
                    size={86}
                    innerRadius={35}
                    outerRadius={42}
                    hasStroke={false}
                    cryptoStats={cardBotData.pieChartData}
                    label={
                      <>
                        <h1 className="font-bold text-[1.25rem] text-center text-dark-300">
                          {cardBotData.pieChartData[0].amount}%
                        </h1>
                        <p className="font-normal text-[0.625rem] text-center text-dark-100">
                          Accuracy
                        </p>
                      </>
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardBot;
