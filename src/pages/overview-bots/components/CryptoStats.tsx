import { ICryptoStats } from '../hooks/useProfile';
import { UpIcon, DownIcon } from '@assets/icons';
import classNames from 'classnames';
import React from 'react';

interface ICryptoStatsProps {
  data: ICryptoStats[];
  showValue?: boolean;
  isEmpty: boolean;
}

const CryptoStats: React.FC<ICryptoStatsProps> = ({
  data,
  showValue,
  isEmpty,
}) => {
  return (
    <div className="mt-5 flex items-center gap-x-8">
      {isEmpty ? (
        <div className="flex flex-none items-center gap-x-3">
          <span className={`w-4 h-4 rounded-full bg-chart-200`}></span>
          <span>
            <h2 className="text-dark-300 font-normal text-base mb-1">$0</h2>
          </span>
          <div>
            <div className="flex justify-center items-center min-w-[3.8125rem] h-[1.4375rem] bg-states rounded-lg px-2 pt-[1px] gap-x-1">
              <h2 className="font-semibold text-base text-white">0%</h2>
            </div>
          </div>
        </div>
      ) : (
        data.map((stats, i) => (
          <div key={i} className="flex flex-none items-center gap-x-3">
            <span
              style={{ background: stats.color }}
              className={`w-4 h-4 rounded-full`}
            ></span>
            <span>
              <h2 className="text-dark-300 font-normal text-base mb-1">
                {stats.amount}
              </h2>
              <h2 className="text-dark-100 font-normal text-xs">{stats.tag}</h2>
            </span>
            <div>
              <div
                className={classNames(
                  'flex justify-center items-center min-w-[3.8125rem] h-[1.4375rem] bg-green-100 rounded-lg px-2 pt-[1px] gap-x-1',
                  { 'bg-red-100': !stats.isProfit }
                )}
              >
                {stats.isProfit ? <UpIcon /> : <DownIcon />}
                <h2 className="font-semibold text-base text-white">
                  {stats.percentage}%
                </h2>
              </div>
              {showValue && (
                <p className="text-xs text-dark-100 mt-1">{`${
                  stats.isProfit ? '+' : '-'
                }${stats.value}`}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CryptoStats;
