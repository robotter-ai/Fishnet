import CustomButton from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const columns = ({
  isSelectUser,
}: {
  isSelectUser: boolean;
}): ITableColumns[] => [
  {
    header: 'Name',
    cell: ({ username }) => <p className="whitespace-nowrap">{username}</p>,
    sortWith: 'username',
  },
  {
    header: 'Hash',
    cell: ({ item_hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item_hash}</p>
        <ClickToCopy text={item_hash} />
      </div>
    ),
    sortWith: 'item_hash',
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
    sortWith: 'link',
  },
  {
    header: 'Description',
    cell: ({ bio }) => <p className="w-52 line-clamp-3">{bio}</p>,
    sortWith: 'bio',
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
