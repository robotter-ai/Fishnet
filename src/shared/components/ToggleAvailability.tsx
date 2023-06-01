import { useEffect } from 'react';
import { ToggleButton } from '@components/form';
import AppModal from '@components/ui/AppModal';
import CustomButton from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  getPublishedDatasets,
  resetDataSlice,
  updateDatasetAvailability,
} from '@slices/dataSlice';
import { toast } from 'react-toastify';
import useAuth from '@shared/hooks/useAuth';

interface IToggleAvailabilityProps {
  datasetId: string;
  available: boolean;
}

const ToggleAvailability: React.FC<IToggleAvailabilityProps> = ({
  datasetId,
  available,
}) => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { isLoading, success } = useAppSelector(
    (state) => state.datasets.updatePublicAccess
  );
  const { isOpen, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (success) {
      toast.success('Dataset have been updated!');
      dispatch(getPublishedDatasets(auth?.address));
      dispatch(resetDataSlice());
      handleClose();
    }
  }, [success]);

  return (
    <>
      <ToggleButton checked={available} onChange={handleOpen} />
      <AppModal title="Warning!" isOpen={isOpen} handleClose={handleClose}>
        <div className="my-[20px]">
          {!available ? (
            <p>
              Any Fishnet user will be able to use this dataset without limits.
            </p>
          ) : null}
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-col gap-4">
          <CustomButton
            text="Yes"
            btnStyle="outline-blue"
            size="lg"
            fullWidth
            isLoading={isLoading}
            onClick={() =>
              dispatch(
                updateDatasetAvailability({
                  dataset_id: datasetId,
                  available: !available,
                })
              )
            }
          />
          <CustomButton
            text="No, back"
            size="lg"
            fullWidth
            onClick={handleClose}
            disabled={isLoading}
          />
        </div>
      </AppModal>
    </>
  );
};

export default ToggleAvailability;
