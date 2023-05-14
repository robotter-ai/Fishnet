import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { ExecutePrompt } from '@shared/components/Prompts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useAuth from '@shared/hooks/useAuth';

const COLUMNS = (
  handleOpenAlgoDetails: (id: string) => void,
  address: string
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
    sortWith: 'name',
  },
  {
    header: 'Hash',
    cell: ({ id_hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{id_hash}</p>
        <ClickToCopy text={id_hash} />
      </div>
    ),
    sortWith: 'id_hash',
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
      <div className="flex gap-3">
        <Starred starred={forgotten} />
      </div>
    ),
  },
  {
    header: 'Filter',
    cell: ({ id_hash, owner }) => (
      <ExecutePrompt
        against="data"
        selectedHash={id_hash}
        disabled={address !== owner}
      />
    ),
  },
];

const BrowseAlgorithmsTable = ({
  data,
  isLoading,
  handleOpenAlgoDetails,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
  handleOpenAlgoDetails: (id: string) => void;
}) => {
  const auth = useAuth();

  return (
    <CustomTable
      data={data}
      columns={COLUMNS(handleOpenAlgoDetails, auth?.address)}
      isLoading={isLoading}
    />
  );
};

export default BrowseAlgorithmsTable;
