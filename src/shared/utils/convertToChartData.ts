export const convertToChartData = (
  data: any[],
  type: 'upload' | 'published'
) => {
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
