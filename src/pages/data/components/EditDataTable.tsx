import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useTimeseriesChart from '../hooks/useTimeseriesChart';

const COLUMNS: ITableColumns[] = [
  {
    header: 'RECORD',
    cell: (item) => <div className="w-[150px]">{item.name}</div>,
    sortWith: 'name',
  },
  {
    header: 'MIN',
    cell: () => '',
  },
  {
    header: 'MAX',
    cell: () => '',
  },
  {
    header: 'AVG',
    cell: () => '',
  },
  {
    header: 'STD',
    cell: () => '',
  },
  {
    header: 'MEDIAN',
    cell: () => '',
  },
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
