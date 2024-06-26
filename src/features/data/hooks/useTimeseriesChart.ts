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

export interface ChartProps {
  id: string;
  interval: string;
  keys: {
    name: string;
    color: string;
  }[];
  data?: Record<string, any>[];
}

const initialState: Partial<ChartProps>[] = [
  {
    id: nanoid(4),
    interval: '',
    keys: [{ name: 'loading...', color: '#6a6a6a' }],
  },
];

export default () => {
  const { id } = useParams();
  const isUpload = (id === 'upload') as boolean;
  const { data: views = [] } = useGetViewsQuery(id as string, {
    skip: isUpload,
  });

  const [charts, setCharts] = useState(initialState);
  const [selectedChart, setSelectedChart] = useState<Partial<ChartProps>>({});
  const { isOpen, handleOpen, handleClose } = useModal();
  const { csvJson, timeseries: uploadDatasetTimeseries } = useAppSelector(
    (state) => state.timeseries
  );

  const { data: publishedDatasetTimeseries = [] } =
    useGetDatasetTimeseriesQuery(id as string, {
      skip: isUpload,
    });

  const timeseriesToUse = useMemo(() => {
    return isUpload ? uploadDatasetTimeseries : publishedDatasetTimeseries;
  }, [uploadDatasetTimeseries, publishedDatasetTimeseries]);

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
    if (isUpload) {
      setCharts([
        {
          id: nanoid(4),
          interval: 'YEAR',
          keys: uploadDatasetTimeseries.slice(0, 3).map((item: any) => ({
            name: item.name,
            color: getRandomColor(),
          })),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (views && views.length) {
      setCharts(
        views.map((view: any) => ({
          id: view.item_hash,
          interval: view.granularity,
          keys: view.columns.map((key: string) => ({
            name: key,
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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDeleteChart = (id: string) => {
    setCharts((prevState) => {
      return [...prevState].filter((item) => item.id !== id);
    });
  };

  return {
    isUpload,
    csvJson,
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
