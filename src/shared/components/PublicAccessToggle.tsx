import React, { useEffect } from 'react';
import { ToggleButton } from '@components/form';
import AppModal from '@components/ui/AppModal';
import CustomButton from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import { toast } from 'sonner';
import { useUpdateDatasetAvailabilityMutation } from '@store/data/api';

interface IPublicAccessToggleProps {
  datasetId: string;
  available: boolean;
}

const PublicAccessToggle: React.FC<IPublicAccessToggleProps> = ({
  datasetId,
  available,
}) => {
  const { isOpen, handleOpen, handleClose } = useModal();

  const [updateDatasetAvailability, { isSuccess, isLoading }] =
    useUpdateDatasetAvailabilityMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Dataset have been updated!');
      handleClose();
    }
  }, [isSuccess]);

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
            btnStyle="outline-primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            onClick={() =>
              updateDatasetAvailability({
                datasetID: datasetId,
                available: !available,
              }).unwrap()
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

export default PublicAccessToggle;
