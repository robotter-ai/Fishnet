import CustomBtn from '@components/ui/CustomBtn';
import { IStatsTableData } from '../hooks/useProfile';
import MiniLineChart from './MiniLineChart';
import CustomText from './CustomText';

interface IStatsTableProps {
  title: string;
  showBtn?: boolean;
  statsData: IStatsTableData[];
  hasQuestionMark?: boolean;
  showActive?: boolean;
  titleStyle?: string;
  isEmpty: boolean;
}

const StatsTable: React.FC<IStatsTableProps> = ({
  title,
  statsData,
  showBtn,
  hasQuestionMark,
  showActive,
  titleStyle,
  isEmpty,
}) => {
  return (
    <div className="border-collapse w-auto flex-none md:flex-1">
      <div
        id="title"
        className={`flex gap-x-4 items-center ${titleStyle || 'mb-3'}`}
      >
        <h2 className="font-semibold text-xs text-dark-300  uppercase">
          {title}
        </h2>
        {showActive && (
          <p className="w-[2.8125rem] text-center font-semibold text-xs py-[2px] px-1 rounded-md bg-green-100 text-white">
            Active
          </p>
        )}
      </div>

      <div>
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 py-1 h-[2.0625rem] border-b border-light-400 ${
              index === 0 ? 'border-t' : ''
            }`}
          >
            <div id="COL 1" className="flex items-center flex-1">
              <CustomText
                index={index}
                length={statsData.length}
                text={stat.label}
                hasQuestionMark={hasQuestionMark}
                toolTipText={stat.toolTipText}
              />
            </div>

            <div
              id="COL 2"
              className="flex justify-between gap-x-1 items-center"
            >
              <div>
                {/* Chart */}
                {isEmpty && !stat.progressValue ? (
                  <div className="w-[6.25rem] h-[2px] bg-states" />
                ) : (
                  stat.chartData && (
                    <div className="w-[5.7rem] h-[1.4375rem]">
                      <MiniLineChart
                        data={stat.chartData}
                        color={stat.color ? stat.color : ''}
                      />
                    </div>
                  )
                )}
                {/* Progress Bar */}
                {stat.progressValue && (
                  <div className="w-[5.7rem] h-[0.479375rem] bg-blue-100 rounded-[34px]">
                    {!isEmpty && (
                      <span
                        style={{ width: `${stat.progressValue}%` }}
                        className="block h-full bg-blue-200 rounded-[34px]"
                      />
                    )}
                  </div>
                )}
              </div>
              <p className="flex-1 text-sm text-dark-300 font-normal text-right leading-none">
                {isEmpty ? 0 : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showBtn && (
        <CustomBtn
          text="Lock OTN"
          size="sm"
          btnStyle="outline-primary"
          xtraStyles="max-w-[4.5625rem] mt-2"
          disabled={isEmpty}
        />
      )}
    </div>
  );
};

export default StatsTable;
