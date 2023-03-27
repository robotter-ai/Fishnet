import { Starred } from '@components/form';
import ClickToCopy from '@components/ui/ClickToCopy';
import { BsDot } from 'react-icons/bs';
import { STATUS_COLOR } from '@shared/constant';
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
    header: 'Access',
    cell: (item) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item.id_hash}</p>
        <ClickToCopy text={item.id_hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Description',
    cell: (item) => <p>{item.desc}</p>,
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
      <ExecutePrompt against="algorithm" selectedHash={item.id_hash} />
    ),
  },
];

const rows = [
  {
    access: <p className="whitespace-nowrap text-blue">Access request</p>,
  },
  {
    access: (
      <div className="flex items-center whitespace-nowrap text-center">
        <p>Allowed</p>
        <BsDot size={45} color={STATUS_COLOR.Allowed} />
      </div>
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
