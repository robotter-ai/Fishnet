import { TrashIcon } from '@assets/icons';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { AiOutlineLine } from 'react-icons/ai';
import { RxDotsHorizontal } from 'react-icons/rx';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartProps } from '../hooks/useTimeseriesChart';

const DataChart: React.FC<{
  data: any[];
  chart: ChartProps;
  withActions?: boolean;
  handleOpenChart?: () => void;
  handleDeleteChart?: () => void;
  isView?: boolean;
}> = ({
  data = [],
  chart,
  withActions,
  handleOpenChart,
  handleDeleteChart,
  isView= false,
}) => {
  const duration = ['D', 'W', '1M', '3M', 'Y', 'All'];
  const [activeDuration, setActiveDuration] = useState(5);

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

  const dataDurationFilter = () => {
    const datedData: any = [];
    data?.forEach((item) => {
      let group = null;
      switch (activeDuration) {
        case 0:
          group = datedData.find((g: any) =>
            dayjs(item.date).isSame(g[0].date, 'day')
          );
          break;
        case 1:
          group = datedData.find((g: any) =>
            dayjs(item.date).isSame(g[0].date, 'week')
          );
          break;
        case 2:
          group = datedData.find((g: any) =>
            dayjs(item.date).isSame(g[0].date, 'month')
          );
          break;
        case 3:
          group = datedData.find((g: any) =>
            dayjs(item.date).isSame(g[0].date, 'months')
          );
          break;
        case 4:
          group = datedData.find((g: any) =>
            dayjs(item.date).isSame(g[0].date, 'year')
          );
          break;
        default:
          group = datedData.find((g: any) =>
            dayjs(item.date).isSame(g[0].date, 'year')
          );
          break;
      }

      if (group) {
        group.push(item);
      } else {
        datedData.push([item]);
      }
    });
    return datedData[0];
  };

  const dataToUse = dataDurationFilter()?.map((item: any) => ({
    date: dayjs(item.date)
      .toDate()
      .toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      .split(',')[0],
    ...getChartData(item),
  }));

  useEffect(() => {
    dataDurationFilter();
  }, [activeDuration]);

  return (
    <div className="bg-form-bg rounded-[32px] py-5 px-6">
      <div className="flex justify-between mb-7">
        {!isView ? (
          <div className="bg-[#E6EEFF] w-[232px] h-8 flex items-center justify-between rounded-full ml-[54px] p-1 px-4">
            {duration.map((item, i) => (
              <p
                key={i}
                className={classNames(
                  'text-xs flex items-center justify-center rounded-full text-center h-6 w-6 cursor-pointer',
                  {
                    'bg-white': i === activeDuration,
                  }
                )}
                onClick={() => setActiveDuration(i)}
              >
                {item}
              </p>
            ))}
          </div>
        ): null}
        {withActions ? (
          <div className="flex gap-2">
            <div
              className="bg-white p-2 flex items-center rounded-full cursor-pointer"
              onClick={handleDeleteChart}
            >
              <TrashIcon />
            </div>
            <div
              className="bg-white p-2 flex items-center rounded-full cursor-pointer"
              onClick={handleOpenChart}
            >
              <RxDotsHorizontal />
            </div>
          </div>
        ) : null}
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dataToUse} margin={{ left: -2 }}>
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
          {isView ? null : (
            <XAxis axisLine={false} tickLine={false} dataKey="date" />
          )}
          {isView ? null : (
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(number) => (number === 0 ? '' : number)}
            />
          )}
          <CartesianGrid opacity={0.8} stroke="#C8CCCD" strokeDasharray="5 5" />
          {!isView ? (
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                padding: '10px',
              }}
              cursor={{ stroke: '#C8CCCD', strokeWidth: 1 }}
              formatter={(value, name) => [value, name]}
            />
          ) : null}
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
      <div className="flex gap-4 mt-5 overflow-x-auto ml-[54px]">
        {chart.keys.map((item, idx: number) => (
          <div key={idx} className="flex items-center gap-1">
            <AiOutlineLine color={item.color} />
            <p className="text-xs whitespace-nowrap">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataChart;
