import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ICryptoStats } from '../hooks/useProfile';

interface ICustomPieChartProps {
  cryptoStats: ICryptoStats[];
  label: JSX.Element;
  size: number;
  innerRadius: number;
  outerRadius: number;
  hasStroke?: boolean;
}

const CustomPieChart: React.FC<ICustomPieChartProps> = ({
  cryptoStats,
  label,
  size,
  innerRadius,
  outerRadius,
  hasStroke = true
}) => {
  return (
    <div className="relative w-fit h-fit">
      <PieChart width={size} height={size}>
        <Pie
          data={cryptoStats}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-360}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="amount"
          stroke={hasStroke ? undefined : 'none'}
        >
          {cryptoStats.map((_, idx) => (
            <Cell
              key={`cell-${idx}`}
              fill={cryptoStats[idx % cryptoStats.length].color}
            />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute top-1/2 translate-y-[-50%] left-0 right-0 mx-auto">
        {label}
      </div>
    </div>
  );
};

export default CustomPieChart;
