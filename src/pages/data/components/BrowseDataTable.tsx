import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
import { StatusIdentifier } from '@shared/constant';
import { Link } from 'react-router-dom';
import { ExecutePrompt } from '@shared/components/Prompts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useAuth from '@shared/hooks/useAuth';

const COLUMNS = (address: string): ITableColumns[] => [
  {
    header: 'Name',
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
    header: 'Status',
    cell: ({ permission_status }) =>
      permission_status === 'NOT REQUESTED' ? (
        <p className="text-blue whitespace-nowrap">Access request</p>
      ) : (
        <StatusIdentifier status={permission_status} />
      ),
    sortWith: 'permission_status',
  },
  {
    header: 'Description',
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
    header: 'Filter',
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
