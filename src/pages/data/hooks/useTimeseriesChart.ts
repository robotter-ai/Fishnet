import useModal from '@shared/hooks/useModal';
import { useAppSelector } from '@shared/hooks/useStore';
import { getRandomColor } from '@shared/utils/getRandomColor';
import {
  useGetDatasetTimeseriesQuery,
  useGetViewsQuery,
} from '@store/data/api';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertToChartData } from '@shared/utils/convertToChartData';

export interface ChartProps {
  id: string;
  interval: string;
  keys: {
    name: string;
    color: string;
  }[];
  data: Record<string, any>[];
}

export default () => {
  const { id } = useParams();
  const isUpload = (id === 'upload') as boolean;
  const { data: views = [] } = useGetViewsQuery(id as string, {
    skip: isUpload,
  });

  const { isOpen, handleOpen, handleClose } = useModal();
  const { timeseries } = useAppSelector((state) => state.data);

  const { data: publishedDatasetTimeseries = [] } =
    useGetDatasetTimeseriesQuery(id as string, {
      skip: isUpload,
    });

  const timeseriesToUse = useMemo(() => {
    return isUpload ? timeseries : publishedDatasetTimeseries;
  }, [timeseries, publishedDatasetTimeseries]);

  const [charts, setCharts] = useState<ChartProps[]>([
    {
      id: nanoid(4),
      interval: 'DAY',
      keys: timeseries?.slice(0, 3)?.map((item: any) => ({
        name: item.name,
        color: getRandomColor(),
      })),
      data: convertToChartData(timeseries, 'upload'),
    },
  ]);
  const [selectedChart, setSelectedChart] = useState<Partial<ChartProps>>({});

  const columns: any[] = timeseriesToUse.map((item: any) => item.name);

  const getViewsData = (view: any): Record<string, any>[] => {
    const values = Object.values(view.values) as [[]];
    let viewsData = [] as Record<string, any>[];

    for (let i = 0; i < view.columns.length; i++) {
      const column = view.columns[i];
      for (let k = 0; k < values[i].length; k++) {
        const value = values[i][k];

        if (i > 0) {
          const cloneData = [...viewsData];
          cloneData[k] = { ...cloneData[k], [column]: value[1] };
          viewsData = cloneData;
        } else {
          viewsData.push({
            date: dayjs.unix(value[0]).format('YYYY-MM-DD HH:MM'),
            [column]: value[1],
          });
        }
      }
    }

    return viewsData;
  };

  useEffect(() => {
    if (views && views.length) {
      setCharts(
        views.map((view: any) => ({
          id: view.item_hash,
          interval: view.granularity,
          keys: view.columns.map((name: string) => ({
            name,
            color: getRandomColor(),
          })),
          data: getViewsData(view),
        }))
      );
    }
  }, [views]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleOpenChart = (id: string) => {
    if (id === 'new') {
      setSelectedChart({
        id: nanoid(4),
        data: convertToChartData(timeseries, 'upload'),
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
    return (prevState: any) => ({
      ...prevState,
      [input]: value,
    });
  };

  const handleSaveChart = () => {
    setCharts((prevState) => {
      const isNew = ![...prevState].filter(
        (item) => item.id === selectedChart.id
      ).length;
      if (isNew) return [...prevState, selectedChart as ChartProps];

      const chartsClone = [...prevState];
      const index = chartsClone.findIndex(
        (item) => item.id === selectedChart.id
      );
      chartsClone[index] = selectedChart as ChartProps;
      return chartsClone;
    });
    handleClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDeleteChart = (id: string) => {
    setCharts((prevState) => {
      return [...prevState].filter((item) => item.id !== id);
    });
  };

  return {
    isUpload,
    charts,
    isOpen,
    columns,
    handleOpenChart,
    handleClose,
    handleOnchangeChart,
    selectedChart,
    handleSaveChart,
    handleDeleteChart,
    timeseries: timeseriesToUse,
  };
};
