import CustomButton from '@components/ui/Button';
import MiniLineChart from './MiniLineChart';
import CustomTabs from './CustomTabs';
import { IHeaderProps } from './Header';
import { ICardBotData } from '../hooks/useProfile';
import classNames from 'classnames';
import { ArrowDown2Icon, ArrowUp2Icon, DownIcon, UpIcon } from '@assets/icons';
import CustomPieChart from './CustomPieChart';
import CardBot from './CardBot';

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
      <div className="mt-2 gap-x-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        {cardBotData.map((item, idx) => (
          <CardBot key={idx} cardBotData={item} />
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
