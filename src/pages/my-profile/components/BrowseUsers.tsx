import CustomButton from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const columns = ({
  isSelectUser,
}: {
  isSelectUser: boolean;
}): ITableColumns[] => [
  {
    header: 'Name',
    cell: ({ username }) => <p className="whitespace-nowrap">{username}</p>,
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
    header: 'Link',
    cell: ({ link }) => (
      <a
        href={link}
        className="text-blue hover:underline"
        rel="noreferrer"
        target="_blank"
      >
        {link}
      </a>
    ),
    isSortable: true,
  },
  {
    header: 'Descrition',
    cell: ({ bio }) => bio,
    isSortable: true,
  },
  {
    header: '',
    cell: () =>
      isSelectUser ? (
        <CustomButton text="Select" btnStyle="outline-blue" />
      ) : null,
  },
];

const BrowseUsers = ({
  isSelectUser,
  allUsers,
}: {
  isSelectUser: boolean;
  allUsers: any;
}) => {
  return (
    <CustomTable
      data={allUsers.data}
      columns={columns({ isSelectUser })}
      isLoading={allUsers.isLoading}
    />
  );
};

export default BrowseUsers;
