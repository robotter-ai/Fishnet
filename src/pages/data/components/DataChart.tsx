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
// import useModal from '@shared/hooks/useModal';
// import { DeletePrompt } from '@shared/components/Prompts';
import { TrashIcon } from '@assets/icons';

const DataChart: React.FC<{
  data: any[];
  chart: any;
  handleOpenChart: () => void;
  handleDeleteChart: () => void;
}> = ({ data, chart, handleOpenChart, handleDeleteChart }) => {
  const duration = ['D', 'W', '1M', '3M', 'Y', 'All'];
  const [activeDuration, setActiveDuration] = useState(2);
  const dataToUse = data.slice(0, 10).map((item: any) => ({
    date: dayjs(item.date).format('MMM DD'),
    [chart.keys[0]]: item[chart.keys[0]],
    [chart.keys[1]]: item[chart.keys[1]],
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
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dataToUse}>
          <defs>
            {chart.keys.map((item: string, idx: number) => (
              <linearGradient
                key={idx}
                id={`color${item}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={idx ? '#6affd2' : '#0054ff'}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={idx ? '#6affd2' : '#0054ff'}
                  stopOpacity={0}
                />
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
          {chart.keys.map((item: string, idx: number) => (
            <Area
              key={idx}
              type="linear"
              dataKey={item}
              stroke={idx ? '#6affd2' : '#0054ff'}
              strokeWidth={1.5}
              fillOpacity={1}
              fill={`url(#color${item})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-3 ml-[3.9rem]">
        {chart.keys.map((item: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <AiOutlineLine color={idx ? '#6affd2' : '#0054ff'} />
            <p>{item}</p>
          </div>
        ))}
      </div>
      {/* <DeletePrompt isOpen={isOpen} handleClose={handleClose} /> */}
    </div>
  );
};

export default DataChart;
