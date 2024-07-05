import dayjs from 'dayjs';

// For converting timeseries to chart data
export const convertToChartData = (data: any[]) => {
  const chartData: any[] = [];

  if (data.length === 0) {
    return chartData;
  }

  for (let i = 0; i < data[0].data.length; i++) {
    const date = data[0].data[i][0] * 1000; // convert to ms
    const chart = data
      .map((item: any) => {
        return {
          [item.name]: item.data[i][1],
        };
      })
      .reduce((acc: any, curr: any) => {
        return { ...acc, ...curr };
      });
    chartData.push({
      date,
      ...chart,
    });
  }

  return chartData;
};

// For converting a view item to chart data
export const convertViewToChartData = (view: any): Record<string, any>[] => {
  const values = Object.values(view.values) as [[]];
  let chartData = [] as Record<string, any>[];

  for (let i = 0; i < view.columns.length; i++) {
    const column = view.columns[i];
    for (let k = 0; k < values[i].length; k++) {
      const value = values[i][k];

      if (i > 0) {
        const cloneData = [...chartData];
        cloneData[k] = { ...cloneData[k], [column]: value[1] };
        chartData = cloneData;
      } else {
        chartData.push({
          date: dayjs.unix(value[0]).format('YYYY-MM-DD HH:MM'),
          [column]: value[1],
        });
      }
    }
  }

  return chartData;
};
