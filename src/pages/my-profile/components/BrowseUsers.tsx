import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import useSelectData from '@shared/hooks/useSelectData';
import { useGetAllUsersQuery } from '@store/profile/api';
import { IUserInfo } from '@store/profile/types';

const columns = ({ isSelect }: { isSelect: boolean }): ITableColumns[] => [
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
        {/* {isSelect ? (
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

const BrowseUsers = () => {
  const { isSelect } = useSelectData();
  const { data, isLoading } = useGetAllUsersQuery();

  return (
    <CustomTable
      data={data as IUserInfo[]}
      columns={columns({ isSelect })}
      isLoading={isLoading}
    />
  );
};

export default BrowseUsers;
