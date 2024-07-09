import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import AddAccessModal from '@shared/components/AddAccessModal';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import useModal from '@shared/hooks/useModal';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch } from '@store/hooks';
import { setPermissionsInput } from '@store/monitor-access/slice';
import { useGetAllUsersQuery } from '@store/profile/api';
import { IUserInfo } from '@store/profile/types';

const columns = ({
  isSelect,
  handleOpenAddAccessModal,
}: {
  isSelect: boolean;
  handleOpenAddAccessModal: (address: string) => void;
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
  ...(isSelect
    ? [
        {
          header: '',
          cell: ({ address }: { address: string }) => (
            <CustomButton
              text="Select"
              btnStyle="outline-primary"
              onClick={() => handleOpenAddAccessModal(address)}
            />
          ),
        },
      ]
    : []),
];

const BrowseUsers = ({ search }: { search: string }) => {
  const dispatch = useAppDispatch();
  const { isSelect } = useSelectData();
  const { data, isLoading } = useGetAllUsersQuery();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();

  const handleOpenAddAccessModal = (value: string) => {
    dispatch(setPermissionsInput({ input: 'requestor', value }));
    handleOpenAccessSettings();
  };

  return (
    <>
      <CustomTable
        data={
          data?.filter(
            (item) =>
              (item?.username &&
                item?.username.toLowerCase().includes(search.toLowerCase())) ||
              (item?.link &&
                item?.link.toLowerCase().includes(search.toLowerCase())) ||
              (item?.bio &&
                item?.bio.toLowerCase().includes(search.toLowerCase()))
          ) as IUserInfo[]
        }
        columns={columns({ isSelect, handleOpenAddAccessModal })}
        isLoading={isLoading}
      />
      <AddAccessModal
        isOpen={isOpenAccessSettings}
        handleClose={handleCloseAccessSettings}
      />
    </>
  );
};

export default BrowseUsers;
