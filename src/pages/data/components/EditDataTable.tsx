import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useTimeseriesChart from '../hooks/useTimeseriesChart';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Timeseries',
    cell: (item) => <div className="w-[150px]">{item.name}</div>,
    sortWith: 'name',
  },
  {
    header: 'min',
    cell: (item) => <div className="w-[120px]">{item.min}</div>,
  },
  {
    header: 'max',
    cell: (item) => <div className="w-[120px]">{item.max}</div>,
  },
  {
    header: 'avg',
    cell: (item) => <div className="w-[120px]">{item.avg}</div>,
  },
  {
    header: 'std',
    cell: (item) => <div className="w-[120px]">{item.std}</div>,
  },
  {
    header: 'median',
    cell: (item) => <div className="w-[120px]">{item.median}</div>,
  },
  {
    header: 'start',
    cell: (item) => <div className="w-[120px]">{new Date(item.earliest * 1000).toLocaleString()}</div>,
  },
  {
    header: 'end',
    cell: (item) => <div className="w-[120px]">{new Date(item.latest * 1000).toLocaleString()}</div>,
  }
];

const EditDataTable = ({
  data,
  isPublished,
}: {
  data: any[];
  isPublished: any;
}) => {
  const { selectedChart, handleDeleteChart, timeseries, dataDetails } =
    useTimeseriesChart();
  return (
    <CustomTable
      data={data}
      columns={COLUMNS}
      // isLoading={isLoading}
    />
  );
};

export default EditDataTable;
