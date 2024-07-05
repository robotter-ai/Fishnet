import useModal from '@shared/hooks/useModal';
import { useAppSelector } from '@shared/hooks/useStore';
import { getRandomColor } from '@shared/utils/getRandomColor';
import {
  useGetDatasetTimeseriesQuery,
  useGetViewsQuery,
} from '@store/data/api';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  convertToChartData,
  convertViewToChartData,
} from '@shared/utils/convertToChartData';
import { setCharts } from '@store/data/slice';
import { useAppDispatch } from '@store/hooks';
import { IChartProps } from '@store/data/types';

export default () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isUpload = (id === 'upload') as boolean;

  const { isOpen, handleOpen, handleClose } = useModal();
  const { timeseries, charts } = useAppSelector((state) => state.data);

  const { data: views = [] } = useGetViewsQuery(id as string, {
    skip: isUpload,
  });
  const { data: publishedTimeseries = [] } = useGetDatasetTimeseriesQuery(
    id as string,
    {
      skip: isUpload,
    }
  );

  const timeseriesToUse = useMemo(() => {
    return isUpload ? timeseries : publishedTimeseries;
  }, [timeseries, publishedTimeseries]);

  const columns: string[] = timeseriesToUse.map((item: any) => item.name);

  const [selectedChart, setSelectedChart] = useState<Partial<IChartProps>>({});

  useEffect(() => {
    if (isUpload) {
      dispatch(
        setCharts([
          {
            id: nanoid(4),
            interval: 'DAY',
            keys: columns?.slice(0, 3)?.map((name) => ({
              name,
              color: getRandomColor(),
            })),
            data: convertToChartData(timeseries),
          },
        ])
      );
    }
  }, []);

  useEffect(() => {
    if (views && views.length) {
      dispatch(
        setCharts(
          views.map((item: any) => ({
            id: item.item_hash,
            interval: item.granularity,
            keys: item.columns.map((name: string) => ({
              name,
              color: getRandomColor(),
            })),
            data: convertViewToChartData(item),
          }))
        )
      );
    }
  }, [views]);

  const handleOpenChart = (chartId: string) => {
    if (chartId === 'new') {
      setSelectedChart({
        id: nanoid(4),
        interval: 'YEAR',
        data: convertToChartData(timeseriesToUse),
      });
    } else {
      const index = charts.findIndex((item) => item.id === chartId);
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
    if (selectedChart.keys?.length === 0) return; // Check if the columns has been added before proceeding

    const isNewChart = ![...charts].filter(
      (item) => item.id === selectedChart.id
    ).length;

    if (isNewChart) {
      dispatch(setCharts([...charts, selectedChart]));
    } else {
      const chartsClone = [...charts];
      const index = chartsClone.findIndex(
        (item) => item.id === selectedChart.id
      );
      chartsClone[index] = selectedChart as IChartProps;

      dispatch(setCharts(chartsClone));
    }

    handleClose();
  };

  const handleDeleteChart = (chartId: string) => {
    const records = [...charts].filter((item) => item.id !== chartId);
    dispatch(setCharts(records));
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
