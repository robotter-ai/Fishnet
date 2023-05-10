import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { DeletePrompt, ExecutePrompt } from '@shared/components/Prompts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const COLUMNS = (
  handleOpenAlgoDetails: (id: string) => void
): ITableColumns[] => [
  {
    header: 'Name',
    cell: ({ name, id_hash }) => (
      <button
        type="button"
        className="text-blue"
        onClick={() => handleOpenAlgoDetails(id_hash)}
      >
        {name}
      </button>
    ),
    isSortable: true,
  },
  {
    header: 'Hash',
    cell: ({ id_hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{id_hash}</p>
        <ClickToCopy text={id_hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Total usages',
    cell: ({ current_revision }) => current_revision,
    isSortable: true,
  },
  {
    header: 'Description',
    cell: ({ desc }) => <p className="w-52 line-clamp-3">{desc}</p>,
  },
  {
    header: '',
    cell: ({ forgotten }) => (
      <div className="flex items-center gap-3">
        <Starred starred={forgotten} />
        <DeletePrompt />
      </div>
    ),
  },
  {
    header: 'Filter',
    cell: ({ id_hash }) => (
      <ExecutePrompt against="data" selectedHash={id_hash} />
    ),
  },
];

const PublishedTable = ({
  data,
  isLoading,
  handleOpenAlgoDetails,
}: {
  data: any[];
  isLoading: boolean;
  handleOpenAlgoDetails: (id: string) => void;
}) => {
  return (
    <CustomTable
      data={data}
      columns={COLUMNS(handleOpenAlgoDetails)}
      isLoading={isLoading}
    />
  );
};

export default PublishedTable;
