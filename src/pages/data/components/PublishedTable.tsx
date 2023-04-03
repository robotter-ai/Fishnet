import { AiOutlineDelete } from 'react-icons/ai';
import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import ClickToCopy from '@components/ui/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useModal from '@shared/hooks/useModal';
import AppModal from '@components/ui/AppModal';
import { useAppDispatch } from '@shared/hooks/useStore';
import { Link } from 'react-router-dom';
import { getDatasets } from '@slices/dataSlice';
import { ExecutePrompt } from '@shared/components/Prompts';
import ToggleAvailability from '@shared/components/ToggleAvailability';

const COLUMNS = (
  handleOpenDeleteModal: () => void,
  dispatch: any
): ITableColumns[] => {
  return [
    {
      header: 'Name',
      accessor: 'name',
      cell: (item) => (
        <Link
          to={`/data/${item.id_hash}/details`}
          className="text-blue whitespace-nowrap"
        >
          {item.name}
        </Link>
      ),
      isSortable: true,
    },
    {
      header: 'Hash',
      accessor: 'id_hash',
      cell: (item) => (
        <div className="flex gap-3">
          <p className="w-[200px] truncate">{item.id_hash}</p>
          <ClickToCopy text={item.id_hash} />
        </div>
      ),
      isSortable: true,
    },
    {
      header: 'Public access',
      accessor: 'available',
      cell: (item) => (
        <ToggleAvailability
          available={item.available}
          datasetId={item.id_hash}
          refetchFunc={() => dispatch(getDatasets())}
        />
      ),
      isSortable: true,
    },
    {
      header: 'Description',
      accessor: 'desc',
      cell: (item) => <p>{item.desc}</p>,
    },
    {
      header: '',
      accessor: 'forgotten',
      cell: (item) => (
        <div className="flex gap-3">
          <Starred starred={item.forgotten} />
          <div
            role="button"
            className="cursor-pointer"
            onClick={handleOpenDeleteModal}
          >
            <AiOutlineDelete size={24} color="#29324A" />
          </div>
        </div>
      ),
    },
    {
      header: 'Filter',
      cell: (item) => (
        <ExecutePrompt against="algorithm" selectedHash={item.id_hash} />
      ),
    },
  ];
};

const PublishedTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenDeleteModal,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();

  return (
    <>
      <CustomTable
        data={data}
        columns={COLUMNS(handleOpenDeleteModal, dispatch)}
        isLoading={isLoading}
      />
      <AppModal
        title="Deleted file cannot be restored"
        isOpen={isOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
      >
        <div className="my-[20px]">
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="Yes, delete"
            btnStyle="outline-red"
            size="lg"
            fullWidth
          />
          <Button text="No, back" size="lg" fullWidth />
        </div>
      </AppModal>
    </>
  );
};

export default PublishedTable;
