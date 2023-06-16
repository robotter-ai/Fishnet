import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { StatusIdentifier } from '@shared/constant';
import { Link } from 'react-router-dom';
import { ExecutePrompt } from '@shared/components/Prompts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useAuth from '@shared/hooks/useAuth';

const COLUMNS = (address: string): ITableColumns[] => [
  {
    header: 'NAME',
    cell: (item) => (
      <Link
        to={`/data/${item.item_hash}/details`}
        className="text-blue whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'OWNER',
    cell: (item) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item.owner}</p>
        <div className="bg-icon-bg h-9 w-9 flex items-center justify-center bg-{#E6FAFF} rounded-full">
          <ClickToCopy text={item.owner} />
        </div>
      </div>
    ),
    sortWith: 'owner',
  },
  {
    header: 'STATUS',
    cell: ({ permission_status, item_hash }) =>
      permission_status === 'NOT REQUESTED' ? (
        <Link
          to={`/data/${item_hash}/details`}
          className="text-blue whitespace-nowrap"
        >
          Access request
        </Link>
      ) : (
        <StatusIdentifier status={permission_status} />
      ),
    sortWith: 'permission_status',
  },
  {
    header: 'DESCRIPTION',
    cell: (item) => <p className="w-52 line-clamp-3">{item.desc}</p>,
    sortWith: 'desc',
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
    header: '',
    cell: (item) => {
      return (
        <ExecutePrompt
          against="algorithm"
          selectedHash={item.item_hash}
          // disabled={item.permission_status !== 'allowed'}
          disabled={address !== item.owner}
        />
      );
    },
  },
];

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const auth = useAuth();

  return (
    <CustomTable
      data={data}
      columns={COLUMNS(auth?.address)}
      isLoading={isLoading}
    />
  );
};

export default BrowseDataTable;
