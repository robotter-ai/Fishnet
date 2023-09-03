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
    header: 'Owner',
    // header: 'Hash',
    cell: ({ address }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{address}</p>
        <ClickToCopy text={address} />
      </div>
    ),
    sortWith: 'address',
  },
  {
    header: 'Link',
    cell: ({ link }) => (
      <a
        href={link}
        className="text-primary hover:underline"
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
        <CustomButton text="Select" btnStyle="outline-primary" />
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
