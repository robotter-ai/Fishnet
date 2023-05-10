import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { StatusIdentifier } from '@shared/constant';
import { Link } from 'react-router-dom';
import { ExecutePrompt } from '@shared/components/Prompts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
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
    cell: (item) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item.id_hash}</p>
        <ClickToCopy text={item.id_hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Status',
    cell: ({ permission_status }) =>
      permission_status === 'NOT REQUESTED' ? (
        <p className="text-blue whitespace-nowrap">Access request</p>
      ) : (
        <StatusIdentifier status={permission_status} />
      ),
    isSortable: true,
  },
  {
    header: 'Description',
    cell: (item) => <p className="w-52 line-clamp-3">{item.desc}</p>,
  },
  {
    header: '',
    cell: (item) => (
      <div className="flex gap-3">
        <Starred starred={item.forgotten} />
      </div>
    ),
  },
  {
    header: 'Filter',
    cell: (item) => (
      <ExecutePrompt
        against="algorithm"
        selectedHash={item.id_hash}
        disabled={item.permission_status !== 'allowed'}
      />
    ),
  },
];

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default BrowseDataTable;
