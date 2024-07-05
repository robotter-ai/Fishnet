import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs, {ManipulateType, OpUnitType} from 'dayjs';
import classNames from 'classnames';
import { TrashIcon } from '@assets/icons';
import { AiOutlineLine } from 'react-icons/ai';
import { RxPencil1 } from 'react-icons/rx';
import { IChartProps } from '@store/data/types';


type DataEntry = {
  date: number;
  [key: string]: number;
}

type FormattedDataEntry = {
  date: string;
  [key: string]: number | string;
}

const DURATION_TYPE = ['D', 'W', '1M', '3M', 'Y', 'All'];

type DurationInfo = {
  value: number;
  type: ManipulateType;
  granularity: OpUnitType;
  granularityStep: number;
};

const getDuration = (index: number): DurationInfo => {
  const mapping = [
    { value: 1, type: 'day', granularity: 'minute', granularityStep: 5 },
    { value: 1, type: 'week', granularity: 'minute', granularityStep: 15},
    { value: 1, type: 'month', granularity: 'hour', granularityStep: 1 },
    { value: 3, type: 'month', granularity: 'hour', granularityStep: 3 },
    { value: 1, type: 'year', granularity: 'day', granularityStep: 1 },
    { value: 100, type: 'year', granularity: 'day', granularityStep: 1 },
  ] as any as DurationInfo[];
  return mapping[index];
};

const formatDateByGranularity = (date: any, durationInfo: DurationInfo) => {
  switch (durationInfo.type) {
    case 'day':
      return dayjs(date).format('HH:mm');
    case 'week':
      return dayjs(date).format('D. HH:mm');
    case 'month':
      return dayjs(date).format('MMM D. HH:mm');
    case 'year':
      return dayjs(date).format('MMM D. YYYY');
    default:
      return dayjs(date).format('MMM D. YYYY');
  }
}

const DataChart: React.FC<{
  data: DataEntry[];
  chart: IChartProps;
  withActions?: boolean;
  handleOpenChart?: () => void;
  handleDeleteChart?: () => void;
  isView?: boolean;
}> = ({ data, chart, withActions, handleOpenChart, handleDeleteChart, isView = false }) => {
  console.log('DataChart', data, chart)
  const [activeDuration, setActiveDuration] = useState(5);
  const durationType = getDuration(activeDuration);

  function filterChartData(): FormattedDataEntry[] {
    if (data.length === 0) return [];
    const cutoffDate = dayjs(data[0].date).subtract(durationType.value, durationType.type);
    return data.filter((item) => {
      return dayjs(item.date).isAfter(cutoffDate);
    }).sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
      .map((item) => {
        const date = formatDateByGranularity(item.date, durationType);
        return {
          ...item,
          date,
        };
      });
  }

  let dataToUse = filterChartData();

  useEffect(() => {
    dataToUse = filterChartData();
  }, [activeDuration]);

  const domainSize = [
    Math.min(...dataToUse.map((item) => {
      const value = item[chart.keys[0].name];
      if (typeof value === 'number') {
        return value
      } else {
        return Number.MAX_SAFE_INTEGER;
      }
    })),
    Math.max(...dataToUse.map((item) => {
      const value = item[chart.keys[0].name];
      if (typeof value === 'number') {
        return value
      } else {
        return Number.MIN_SAFE_INTEGER;
      }
    })),
  ]
  return (
    <div className="bg-form-bg rounded-[32px] py-5 px-6">
      <div className="flex justify-between mb-7">
        {!isView ? (
          <div className="bg-[#E6EEFF] w-[232px] h-8 flex items-center justify-between rounded-full ml-[54px] p-1 px-4">
            {DURATION_TYPE.map((item, i) => (
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
              <RxPencil1 />
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
              domain={domainSize}
            />
          )}
          <CartesianGrid opacity={0.8} stroke="#C8CCCD" strokeDasharray="3 3"
          verticalCoordinatesGenerator={(props) =>
            props.width > 450 ? [150, 300, 450] : [200, 400]
          }
          />
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

export default React.memo(DataChart);
