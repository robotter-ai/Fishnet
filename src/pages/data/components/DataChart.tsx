import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { AiOutlineLine } from 'react-icons/ai';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useState } from 'react';
import classNames from 'classnames';
import { TrashIcon } from '@assets/icons';
import { ChartProps } from '../hooks/useTimeseriesChart';

const DataChart: React.FC<{
  data: any[];
  chart: ChartProps;
  isOwner: boolean;
  handleOpenChart: () => void;
  handleDeleteChart: () => void;
}> = ({ data, chart, isOwner, handleOpenChart, handleDeleteChart }) => {
  const duration = ['D', 'W', '1M', '3M', 'Y', 'All'];
  const [activeDuration, setActiveDuration] = useState(2);

  const getChartData = (x: any): {} => {
    let keysWithValue = {};
    for (let i = 0; i < chart.keys.length; i++) {
      keysWithValue = {
        ...keysWithValue,
        [chart.keys[i].name]: x[chart.keys[i].name],
      };
    }
    return keysWithValue;
  };

  const dataToUse = data.slice(0, 10).map((item: any) => ({
    date: dayjs(item.date).format('MMM DD'),
    ...getChartData(item),
  }));

  return (
    <div className="bg-[#FAFAFA] rounded-[10px] p-4">
      <div className="flex justify-between mb-7 ml-[3.9rem]">
        <div className="bg-[#E6EEFF] flex items-center rounded-md p-1">
          {duration.map((item, i) => (
            <p
              key={i}
              className={classNames('py-2 px-3 rounded-md cursor-pointer', {
                'bg-white': i === activeDuration,
              })}
              onClick={() => setActiveDuration(i)}
            >
              {item}
            </p>
          ))}
        </div>
        {isOwner ? (
          <div className="flex gap-2">
            <div
              className="bg-white p-3 flex items-center rounded-md cursor-pointer"
              onClick={handleDeleteChart}
            >
              <TrashIcon />
            </div>
            <div
              className="bg-white p-3 flex items-center rounded-md cursor-pointer"
              onClick={handleOpenChart}
            >
              <RxDotsHorizontal />
            </div>
          </div>
        ) : null}
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dataToUse}>
          <defs>
            {chart.keys.map((item, idx: number) => (
              <linearGradient
                key={idx}
                id={`color${item.name}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={item.color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={item.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(number) => (number === 0 ? '' : number)}
          />
          <CartesianGrid opacity={0.5} vertical={false} />
          <Tooltip />
          {chart.keys.map((item, idx: number) => (
            <Area
              key={idx}
              type="linear"
              dataKey={item.name}
              stroke={item.color}
              strokeWidth={1.5}
              fillOpacity={1}
              fill={`url(#color${item.name})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-3 mt-5 overflow-x-auto">
        {chart.keys.map((item, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <AiOutlineLine color={item.color} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataChart;
