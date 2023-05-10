import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { Link } from 'react-router-dom';
import { DeletePrompt, ExecutePrompt } from '@shared/components/Prompts';
import ToggleAvailability from '@shared/components/ToggleAvailability';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    accessor: 'name',
    cell: (item) => (
      <Link
        to={`/data/${item.id_hash}/details`}
        className="text-blue whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    isSortable: true,
  },
  {
    header: 'Hash',
    accessor: 'id_hash',
    cell: (item) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item.id_hash}</p>
        <ClickToCopy text={item.id_hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Public access',
    accessor: 'available',
    cell: (item) => (
      <ToggleAvailability available={item.available} datasetId={item.id_hash} />
    ),
    isSortable: true,
  },
  {
    header: 'Description',
    accessor: 'desc',
    cell: (item) => <p className="w-52 line-clamp-3">{item.desc}</p>,
  },
  {
    header: '',
    accessor: 'forgotten',
    cell: (item) => (
      <div className="flex items-center gap-3">
        <Starred starred={item.forgotten} />
        <DeletePrompt />
      </div>
    ),
  },
  {
    header: 'Filter',
    cell: (item) => (
      <ExecutePrompt against="algorithm" selectedHash={item.id_hash} />
    ),
  },
];

const PublishedTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default PublishedTable;
