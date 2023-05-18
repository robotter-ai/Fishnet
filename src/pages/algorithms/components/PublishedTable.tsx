import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { DeletePrompt, ExecutePrompt } from '@shared/components/Prompts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const COLUMNS = (
  handleOpenAlgoDetails: (id: string) => void
): ITableColumns[] => [
  {
    header: 'Name',
    cell: ({ name, item_hash }) => (
      <button
        type="button"
        className="text-blue"
        onClick={() => handleOpenAlgoDetails(item_hash)}
      >
        {name}
      </button>
    ),
    sortWith: 'name',
  },
  {
    header: 'Owner',
    cell: (item) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item.owner}</p>
        <ClickToCopy text={item.owner} />
      </div>
    ),
    sortWith: 'owner',
  },
  {
    header: 'Total usages',
    cell: ({ current_revision }) => current_revision,
    sortWith: 'current_revision',
  },
  {
    header: 'Description',
    cell: ({ desc }) => <p className="w-52 line-clamp-3">{desc}</p>,
    sortWith: 'desc',
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
    cell: ({ item_hash }) => (
      <ExecutePrompt against="data" selectedHash={item_hash} />
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
