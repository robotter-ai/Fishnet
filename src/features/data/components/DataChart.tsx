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
import { AiOutlineLine, AiOutlineDelete } from 'react-icons/ai';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useState } from 'react';
import classNames from 'classnames';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@shared/hooks/useModal';

const data: { date: string; volaBTC: number; returnsBTC: number }[] = [];

for (let i = 0; i <= 6; i++) {
  data.push({
    date: dayjs(new Date())
      .add(i * 6, 'day')
      .format('MMM DD'),
    volaBTC: Math.floor(Math.random() * (1 + 2000 - 50)) + 50,
    returnsBTC: Math.floor(Math.random() * (1 + 2000 - 50)) + 50,
  });
}

const DataChart = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const duration = ['D', 'W', '1M', '3M', 'Y', 'All'];
  const [activeDuration, setActiveDuration] = useState(2);

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
            onClick={handleOpen}
          >
            <AiOutlineDelete size={20} />
          </div>
          <div className="bg-white p-3 flex items-center rounded-md cursor-pointer">
            <RxDotsHorizontal />
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVolaBTC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0054ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#0054ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorReturnsBTC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6affd2" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#6affd2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(number) => (number === 0 ? '' : number)}
          />
          <CartesianGrid opacity={0.5} vertical={false} />
          <Tooltip />
          <Area
            type="linear"
            dataKey="volaBTC"
            stroke="#0054ff"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#colorVolaBTC)"
          />
          <Area
            type="linear"
            dataKey="returnsBTC"
            stroke="#6affd2"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#colorReturnsBTC)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-3 ml-[3.9rem]">
        <div className="flex items-center gap-2">
          <AiOutlineLine color="#0054ff" />
          <p>volaBTC</p>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineLine color="#6affd2" />
          <p>returnsBTC</p>
        </div>
      </div>
      <AppModal
        title="The changes will not not be saved"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="my-[20px]">
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="Yes, delete"
            btnStyle="outline-red"
            size="lg"
            fullWidth
          />
          <Button text="No, back" size="lg" fullWidth />
        </div>
      </AppModal>
    </div>
  );
};

export default DataChart;
