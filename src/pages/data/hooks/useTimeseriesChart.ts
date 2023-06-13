import { useState } from 'react';
import { nanoid } from 'nanoid';
import useModal from '@shared/hooks/useModal';
import { useAppSelector } from '@shared/hooks/useStore';

export interface ChartProps {
  id: string;
  interval: string;
  keys: {
    name: string;
    color: string;
  }[];
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const initialState: Partial<ChartProps>[] = [
  {
    id: nanoid(4),
    interval: '',
    keys: [
      { name: 'volaBTC', color: '#0054ff' },
      { name: 'returnsBTC', color: '#6affd2' },
    ],
  },
];

export default () => {
  const [charts, setCharts] = useState(initialState);
  const [selectedChart, setSelectedChart] = useState<Partial<ChartProps>>({});
  const { isOpen, handleOpen, handleClose } = useModal();
  const { csvJson, timeseries } = useAppSelector((state) => state.timeseries);

  const handleOpenChart = (id: string) => {
    if (id === 'new') {
      setSelectedChart({
        id: nanoid(4),
      });
    } else {
      const index = charts.findIndex((item) => item.id === id);
      setSelectedChart(charts[index]);
    }
    handleOpen();
  };

  const handleOnchangeChart = (input: 'interval' | 'keys', value: any) => {
    if (input === 'keys') {
      if (selectedChart?.keys?.some((x) => x.name === value)) {
        return setSelectedChart((prevState) => ({
          ...prevState,
          keys: [...(prevState.keys as any[])].filter(
            (item) => item.name !== value
          ),
        }));
      }
      return setSelectedChart((prevState) => ({
        ...prevState,
        keys: [
          ...(prevState.keys || []),
          { name: value, color: getRandomColor() },
        ],
      }));
    }
    return setSelectedChart((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const handleSaveChart = () => {
    setCharts((prevState) => {
      const isNew = ![...prevState].filter(
        (item) => item.id === selectedChart?.id
      ).length;
      if (isNew) return [...prevState, selectedChart];
      const newData = [...prevState];
      const index = newData.findIndex((item) => item.id === selectedChart?.id);
      newData[index] = selectedChart;
      return newData;
    });
    handleClose();
  };

  const handleDeleteChart = (id: string) => {
    setCharts((prevState) => {
      return [...prevState].filter((item) => item.id !== id);
    });
  };

  return {
    csvJson,
    charts,
    isOpen,
    handleOpenChart,
    handleClose,
    handleOnchangeChart,
    selectedChart,
    handleSaveChart,
    handleDeleteChart,
    timeseries,
  };
};
