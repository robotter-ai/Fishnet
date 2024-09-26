import CustomButton from '@components/ui/Button';
import MiniLineChart from './MiniLineChart';
import CustomTabs from './CustomTabs';
import { IHeaderProps } from './Header';
import { ICardBotData } from '../hooks/useProfile';
import classNames from 'classnames';
import { ArrowDown2Icon, ArrowUp2Icon, DownIcon, UpIcon } from '@assets/icons';
import CustomPieChart from './CustomPieChart';

interface IPerformanceProps extends IHeaderProps {
  cardBotData: ICardBotData[];
}

const Performance: React.FC<IPerformanceProps> = ({
  query,
  tabs,
  searchParams,
  setSearchParams,
  cardBotData,
}) => {
  return (
    <div className="flex flex-col items-center w-full lg:w-auto mt-4 lg:mt-0">
      <h2 className="font-semibold text-xs text-dark-300 text-center">
        Active Bots
      </h2>
      <div className="w-[19.25rem] h-[1.9375rem] my-4">
        <CustomTabs
          isTab={false}
          query={query}
          tabs={tabs}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      {/* CardBot */}
      <div id="card_bot" className="mt-2 gap-x-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        {cardBotData.map((item, idx) => (
          <div
            key={idx}
            className="max-w-[20.3125rem] w-full h-[11.9375rem] rounded-[22px] bg-light-200 border border-chart-300 p-4 mb-4"
          >
            <div id="table_header" className="flex justify-between">
              <h2 className="text-xs w-[20%] font-bold text-dark-300">
                {item.name}
              </h2>

              <div className="flex">
                <div id="P&L">
                  <h2
                    className={classNames(
                      'text-xs font-semibold text-green-100 m-0',
                      { 'text-red-100': !item.isPositive }
                    )}
                  >
                    {`${item.isPositive ? '+' : '-'} $${item.rate}`}
                  </h2>
                  <p className="text-[0.625rem] text-dark-200 m-0">
                    P&L last week
                  </p>
                </div>
                <div className="w-[3.375rem] h-auto">
                  <MiniLineChart
                    data={item.lineChartData}
                    color={item.isPositive ? '#218358' : '#CE2C31'}
                  />
                </div>
              </div>

              <CustomButton
                text="View"
                style={{ background: 'transparent' }}
                xtraStyles="flex justify-center items-center py-1 text-xs text-navy border border-navy w-[2.75rem] h-[1.4375rem] transition-colors duration-300 hover:!bg-navy hover:!text-white"
              />
            </div>

            <div className="flex items-center justify-between mt-2 gap-x-4">
              <div id="table" className="flex-1">
                {item.tableData.map((row, i) => (
                  <div key={i} id="row" className="grid grid-cols-2 mb-2">
                    <div id="col1" className="flex-1">
                      <h2 className="font-semibold text-xs text-dark-300">
                        {row.labelA[0]}%
                      </h2>
                      <p className="text-[0.625rem] text-dark-200 mt-0 leading-none">
                        {row.labelA[1]}
                      </p>
                    </div>
                    <div
                      id="col2"
                      className="grid grid-cols-2 items-center gap-x-2 flex-1"
                    >
                      <div>
                        <h2 className="text-xs text-dark-300">
                          {row.labelB[0]}
                        </h2>
                        <p className="text-[0.625rem] text-dark-200 mt-[-2px]">
                          {row.labelB[1]}
                        </p>
                      </div>
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
                    </div>
                  </div>
                ))}
              </div>
              <CustomPieChart
                size={100}
                innerRadius={40}
                outerRadius={50}
                hasStroke={false}
                cryptoStats={item.pieChartData}
                label={
                  <>
                    <h1 className="font-bold text-[1.25rem] text-center text-dark-300">
                      {item.pieChartData[0].amount}%
                    </h1>
                    <p className="font-normal text-[0.625rem] text-center text-dark-100">
                      Accuracy
                    </p>
                  </>
                }
              />
            </div>
          </div>
        ))}
      </div>

      <span className="flex items-center gap-x-4">
        {[<ArrowDown2Icon />, <ArrowUp2Icon />].map((icon, idx) => (
          <span
            key={idx}
            className="flex justify-center items-center w-[2.25rem] h-[2.25rem] bg-blue-100 text-blue-400 rounded-full cursor-pointer transition-colors duration-300 hover:text-white hover:bg-navy"
          >
            {icon}
          </span>
        ))}
      </span>
    </div>
  );
};

export default Performance;
