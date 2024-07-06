import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import AddAccessModal from '@shared/components/AddAccessModal';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import useModal from '@shared/hooks/useModal';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch } from '@store/hooks';
import { onChangePermissionsInput } from '@store/monitor-access/slice';
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

const BrowseUsers = () => {
  const dispatch = useAppDispatch();
  const { isSelect } = useSelectData();
  const { data, isLoading } = useGetAllUsersQuery();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();

  const handleOpenAddAccessModal = (value: string) => {
    dispatch(onChangePermissionsInput({ input: 'requestor', value }));
    handleOpenAccessSettings();
  };

  return (
    <>
      <CustomTable
        data={data as IUserInfo[]}
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
