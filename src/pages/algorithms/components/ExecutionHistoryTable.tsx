import Button from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import { StatusIdentifier } from '@shared/constant';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import dayjs from 'dayjs';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Execution Date',
    cell: ({ timestamp }) => (
      <p className="whitespace-nowrap">
        {dayjs(timestamp).format('YYYY-MM-DD H:MM:SS')}
      </p>
    ),
    isSortable: true,
  },
  {
    header: 'Hash of data',
    cell: ({ datasetID }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{datasetID}</p>
        <ClickToCopy text={datasetID} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Hash of algorithm',
    cell: ({ algorithmID }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{algorithmID}</p>
        <ClickToCopy text={algorithmID} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Result',
    cell: ({ status }) => <StatusIdentifier status={status} />,
    isSortable: true,
  },
  {
    header: 'Filter',
    cell: ({ id_hash }) => (
      <div className="flex gap-3 justify-end">
        <Button text="Result" btnStyle="outline-blue" />
      </div>
    ),
  },
];

const ExecutionHistoryTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default ExecutionHistoryTable;
