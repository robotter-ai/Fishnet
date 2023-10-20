import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import TruncatedAddress from '@shared/components/TruncatedAddress';

const columns = ({
  isSelectUser,
}: {
  isSelectUser: boolean;
}): ITableColumns[] => [
  {
    header: 'USERNAME',
    cell: ({ username }) => <p className="whitespace-nowrap">{username}</p>,
    sortWith: 'username',
  },
  {
    header: 'DESCRIPTION',
    cell: ({ bio }) => <p className="w-52 line-clamp-3">{bio}</p>,
    sortWith: 'address',
  },
  {
    header: 'WALLET',
    cell: ({ address }) => <TruncatedAddress address={address} copy />,
    sortWith: 'link',
  },
  {
    header: 'DLs',
    cell: ({ downloads }) => downloads,
    sortWith: 'bio',
  },
  {
    header: 'Link',
    cell: ({ link }) => (
      <>
        {/* {isSelectUser ? (
          <CustomButton text="Select" btnStyle="outline-primary" />
        ) : null} */}
        <a
          href={link}
          className="text-primary hover:underline"
          rel="noreferrer"
          target="_blank"
        >
          {link}
        </a>
      </>
    ),
    sortWith: 'link',
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
