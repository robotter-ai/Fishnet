import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from '@components/ui/Button';
import { ToggleButton, Starred } from '@components/form';
import ClickToCopy from '@components/ui/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import useModal from '@shared/hooks/useModal';
import AppModal from '@components/ui/AppModal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  getDatasets,
  resetDataSlice,
  updateDatasetAvailability,
} from '../slices/dataSlice';

const COLUMNS = (
  handleOpenDeleteModal: () => void,
  handleSetPublicAccess: (id_hash: string, available: boolean) => void
): ITableColumns[] => {
  return [
    {
      header: 'Name',
      accessor: 'name',
      cell: ({ name }) => (
        <Link
          to={`/data/${'dataset-id'}/details`}
          className="text-blue whitespace-nowrap"
        >
          {name}
        </Link>
      ),
      isSortable: true,
    },
    {
      header: 'Hash',
      accessor: 'id_hash',
      cell: ({ id_hash }) => (
        <div className="flex gap-3">
          <p className="w-[200px] truncate">{id_hash}</p>
          <ClickToCopy text={id_hash} />
        </div>
      ),
      isSortable: true,
    },
    {
      header: 'Public access',
      accessor: 'available',
      cell: ({ id_hash, available }) => (
        <div className="flex justify-center text-center">
          <ToggleButton
            checked={available}
            onChange={() => handleSetPublicAccess(id_hash, available)}
          />
        </div>
      ),
      isSortable: true,
    },
    {
      header: 'Description',
      accessor: 'desc',
      cell: ({ desc }) => <p>{desc}</p>,
    },
    {
      header: '',
      accessor: 'forgotten',
      cell: ({ forgotten }) => (
        <div className="flex gap-3">
          <Starred starred={forgotten} />
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
      accessor: 'id_hash',
      cell: ({ id_hash }) => <Button text="Use" btnStyle="outline-blue" />,
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
  const { isLoading: isLoadingUpdateAccess, success } = useAppSelector(
    (state) => state.datasets.updatePublicAccess
  );
  const [details, setDetails] = useState({
    id: '',
    available: false,
  });
  const {
    isOpen: isOpenDeleteModal,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();
  const {
    isOpen: isOpenAvailability,
    handleOpen: handleOpenAvailability,
    handleClose: handleCloseAvailability,
  } = useModal();

  useEffect(() => {
    if (success) {
      toast.success('Dataset have been updated!');
      dispatch(resetDataSlice());
      dispatch(getDatasets());
      handleCloseAvailability();
    }
  }, [success]);

  const handleSetPublicAccess = (id: string, available: boolean) => {
    setDetails({ id, available });
    handleOpenAvailability();
  };

  const handleChangePublicAccess = (dataset_id: string, available: boolean) => {
    dispatch(updateDatasetAvailability({ dataset_id, available: !available }));
  };

  return (
    <>
      <CustomTable
        data={data}
        columns={COLUMNS(handleOpenDeleteModal, handleSetPublicAccess)}
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
      <AppModal
        title="Warning!"
        isOpen={isOpenAvailability}
        handleClose={handleCloseAvailability}
      >
        <div className="my-[20px]">
          <p>
            Any Fishnet user will be able to use this dataset without limits.
          </p>
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="Yes"
            btnStyle="outline-blue"
            size="lg"
            fullWidth
            isLoading={isLoadingUpdateAccess}
            onClick={() =>
              handleChangePublicAccess(details.id, details.available)
            }
          />
          {!isLoadingUpdateAccess ? (
            <Button
              text="No, back"
              size="lg"
              fullWidth
              onClick={handleCloseAvailability}
            />
          ) : null}
        </div>
      </AppModal>
    </>
  );
};

export default PublishedTable;
