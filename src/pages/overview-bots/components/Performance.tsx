import { ArrowDown2Icon, ArrowUp2Icon } from '@assets/icons';
import { ICardBotData } from '../hooks/useProfile';
import { IHeaderProps } from './Header';
import Switcher from './Switcher';
import CardBot from './CardBot';

interface IPerformanceProps extends IHeaderProps {
  cardBotData: ICardBotData[];
  isEmpty: boolean;
}

const Performance: React.FC<IPerformanceProps> = ({
  query,
  tabs,
  searchParams,
  setSearchParams,
  cardBotData,
  isEmpty,
}) => {
  return (
    <div className="flex flex-col items-center w-full xl:w-auto mt-4 xl:mt-0">
      <h2 className="font-semibold text-xs text-dark-300 text-center">
        Active Bots
      </h2>

      <div className="w-[19.25rem] h-[1.9375rem] my-4">
        <Switcher
          keyQuery="perf"
          query={query}
          tabs={tabs}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      {/* CardBot */}
      <div className="mt-2 w-full gap-x-3 overflow-x-auto flex lt:flex-col flex-row xl:flex-col lt:items-center">
        {cardBotData.map((item, idx) => (
          <CardBot
            isEmpty={isEmpty}
            key={idx}
            cardBotData={item}
            xtraStyle="lg:flex-auto flex-none"
          />
        ))}
      </div>

      {!isEmpty && (
        <span className="flex items-center gap-x-4">
          {[
            <ArrowDown2Icon width="1.5rem" height="1.5rem" />,
            <ArrowUp2Icon width="1.5rem" height="1.5rem" />,
          ].map((icon, idx) => (
            <span
              key={idx}
              className="flex justify-center items-center w-[2.25rem] h-[2.25rem] bg-blue-100 text-blue-400 rounded-full cursor-pointer transition-colors duration-300 hover:text-white hover:bg-navy/80"
            >
              {icon}
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default Performance;
