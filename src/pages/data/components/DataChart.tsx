import { TrashIcon } from '@assets/icons';
import { DataType, ViewValues } from '@slices/dataSlice/dataService';
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
  isViewValue?: boolean;
  columns?: string[];
  isOwner: boolean;
  handleOpenChart: () => void;
  handleDeleteChart: () => void;
}> = ({
  data,
  chart,
  isOwner,
  handleOpenChart,
  handleDeleteChart,
  columns,
  isViewValue,
}) => {
  const duration = ['D', 'W', '1M', '3M', 'Y', 'All'];
  const [activeDuration, setActiveDuration] = useState(2);
  const [currentData, setCurrentData] = useState(data);

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

  function convertViewValuesToDataType(viewValues: ViewValues): DataType[][] {
    const convertedData: DataType[][] = [];

    Object.entries(viewValues).forEach(([key, values]) => {
      const keyData: DataType[] = [];

      values.forEach(([date, name]) => {
        keyData.push({ name, date });
      });

      convertedData.push(keyData);
    });
    return convertedData;

    // Little side note, you'll use the index of the data of the column to fetch the data you currently want to display
  }
  useEffect(() => {
    if (isViewValue) {
      // @ts-ignore
      const convValue = convertViewValuesToDataType(data);
      setCurrentData(convValue);
      console.log(currentData);
    }
  }, [isViewValue]);

  const dataDurationFilter = () => {
    console.log(data);
    const datedData: any = [];
    data.forEach((item) => {
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
    console.log(datedData[0]);
    return datedData[0];
  };
  const dataToUse = dataDurationFilter()?.map((item: any) => ({
    date: dayjs(item.date).format('MMM DD'),
    ...getChartData(item),
  }));
  console.log(dataToUse);

  useEffect(() => {
    dataDurationFilter();
  }, [activeDuration]);
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
        {isViewValue ? (
          <AreaChart data={currentData}>
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
            <XAxis dataKey="graphData" axisLine={false} tickLine={false} />
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
        ) : (
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
        )}
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
