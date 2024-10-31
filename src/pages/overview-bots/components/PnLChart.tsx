import { useEffect, useState } from 'react';
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export interface IDataPoint {
  date: string;
  profit: number;
  loss: number;
  lineValue: number;
}

const data: IDataPoint[] = [
  { date: '30.08', profit: 2000, loss: -1000, lineValue: 1000 },
  { date: '31.08', profit: 1900, loss: -1400, lineValue: 500 },
  { date: '01.09', profit: 1100, loss: -1600, lineValue: -800 },
  { date: '02.09', profit: 1100, loss: -1100, lineValue: 50 },
  { date: '04.09', profit: 1400, loss: -1000, lineValue: 400 },
  { date: '05.09', profit: 1500, loss: -700, lineValue: 600 },
  { date: '06.09', profit: 1400, loss: -800, lineValue: 500 },
  { date: '07.09', profit: 1000, loss: -500, lineValue: 100 },
  { date: '08.09', profit: 1200, loss: -600, lineValue: 200 },
  { date: '09.09', profit: 1600, loss: -1000, lineValue: 500 },
  { date: '10.09', profit: 1800, loss: -800, lineValue: 800 },
  { date: '11.09', profit: 1300, loss: -500, lineValue: 700 },
  { date: '12.09', profit: 1900, loss: -1400, lineValue: 500 },
  { date: '13.09', profit: 1100, loss: -1600, lineValue: -500 },
  { date: '14.09', profit: 1100, loss: -1100, lineValue: 50 },
  { date: '15.09', profit: 1400, loss: -1000, lineValue: 400 },
  { date: '16.09', profit: 1500, loss: -700, lineValue: 600 },
  { date: '17.09', profit: 1400, loss: -800, lineValue: 500 },
  { date: '18.09', profit: 1000, loss: -300, lineValue: 100 },
  { date: '19.09', profit: 1200, loss: -600, lineValue: 200 },
  { date: '20.09', profit: 1600, loss: -1000, lineValue: 500 },
  { date: '21.09', profit: 1800, loss: -800, lineValue: 800 },
  { date: '22.09', profit: 1300, loss: -500, lineValue: 700 },
];

const formatYAxisTicks = (tick: number) => {
  const maxTick = Math.max(
    ...data.map((item) => Math.max(item.profit, item.loss, item.lineValue))
  );
  return tick === maxTick ? `$${tick}` : `${tick}`;
};

interface IPnLChartProps {
  height: number;
  minWidth: number;
}

const PnLChart: React.FC<IPnLChartProps> = ({ height, minWidth }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContainer
      width={
        windowWidth >= 1280 && windowWidth <= 1441
          ? windowWidth - minWidth
          : '100%'
      }
      height={height}
    >
      <ComposedChart
        data={data}
        stackOffset="sign"
        margin={{
          top: 10,
          left: -15,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="0" vertical={false} />
        <XAxis
          dataKey="date"
          axisLine={{ stroke: '#DBD8E0' }}
          tickLine={{ stroke: '#DBD8E0' }}
          tick={{ fontSize: 12, fill: '#65636D' }}
        />
        <YAxis
          axisLine={false}
          tickCount={9}
          interval={0}
          tickFormatter={formatYAxisTicks}
          domain={['auto', 'auto']}
          tickLine={{ stroke: '#DBD8E0' }}
          tick={{ fontSize: 12, fill: '#65636D' }}
        />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#DBD8E0" />

        {/* Profit (Green) and Loss (Red) bars */}
        <Bar dataKey="profit" stackId="stack" fill="#A3E5C8" />
        <Bar dataKey="loss" stackId="stack" fill=" #FFAFB2" />

        {/* Line chart */}
        <Line
          type="monotone"
          dataKey="lineValue"
          stroke="#0D74CE"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default PnLChart;
