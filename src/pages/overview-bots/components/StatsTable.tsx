import { IStatsTableData } from '../hooks/useProfile';
import CustomButton from '@components/ui/Button';
import MiniLineChart from './MiniLineChart';
import CustomText from './CustomText';

interface IStatsTableProps {
  title: string;
  showBtn?: boolean;
  statsData: IStatsTableData[];
}

const StatsTable: React.FC<IStatsTableProps> = ({
  title,
  statsData,
  showBtn,
}) => {
  return (
    <div className="border-collapse flex-1">
      <h2 className="font-semibold text-xs text-dark-300 border-b border-b-light-400 pb-3 uppercase">
        {title}
      </h2>
      <div>
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-1 xl:h-[2.0625rem] border-b border-b-light-400"
          >
            <CustomText text={stat.label} toolTipText={stat.label} />
            <div className="flex flex-[2] justify-end">
              {/* Chart */}
              {stat.chartData && (
                <div className="w-[6.25rem] h-[1.4375rem]">
                  <MiniLineChart data={stat.chartData} color={stat.color} />
                </div>
              )}
              {/* Progress Bar */}
              {stat.progressValue && (
                <div className="w-[6.25rem] h-[0.479375rem] bg-blue-100 rounded-[34px]">
                  <span
                    style={{ width: `${stat.progressValue}%` }}
                    className="block h-full bg-blue-200 rounded-[34px]"
                  ></span>
                </div>
              )}
            </div>
            <p className="flex-[2] text-sm text-dark-300 font-normal text-right leading-none">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      {showBtn && (
        <CustomButton
          text="Lock OTN"
          style={{ background: 'transparent' }}
          xtraStyles="flex justify-center items-center mt-2 py-1 text-xs text-navy border border-navy w-[4.5625rem] h-[1.4375rem] transition-colors duration-300 hover:!bg-navy hover:!text-white"
        />
      )}
    </div>
  );
};

export default StatsTable;
