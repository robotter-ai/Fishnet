import { useState } from 'react';
import { nanoid } from 'nanoid';
import useModal from '@shared/hooks/useModal';
import { useAppSelector } from '@shared/hooks/useStore';

interface ChartProps {
  id: string;
  interval: string;
  keys: string[];
}

const initialState: Partial<ChartProps>[] = [
  {
    id: nanoid(4),
    interval: '',
    keys: ['volaBTC', 'returnsBTC'],
  },
];

export default () => {
  const [charts, setCharts] = useState(initialState);
  const [selectedChart, setSelectedChart] = useState<Partial<ChartProps>>({});
  const { isOpen, handleOpen, handleClose } = useModal();
  const { csvJson } = useAppSelector((state) => state.timeseries);

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
      let keys: string[] = [...(selectedChart.keys || [])];
      if (keys.length === 2) {
        keys.pop();
      }
      keys = [value, ...keys];

      return setSelectedChart((prevState) => ({
        ...prevState,
        keys,
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
  };
};
