import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import CustomButton from '@components/ui/Button';
import { useAppDispatch } from '@shared/hooks/useStore';
import { useAppSelector } from '@store/hooks';
import { useGrantDatasetPermissionsMutation } from '@store/monitor-access/api';
import {
  setPermissionsInput,
  resetPermissionsInput,
} from '@store/monitor-access/slice';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getTruncatedAddress } from './TruncatedAddress';

const AddAccessModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.monitorAccess);

  const [grantPermissions, { isLoading }] =
    useGrantDatasetPermissionsMutation();

  const handleGrantPermission = () => {
    grantPermissions({
      dataset_id: permissions.datasetID,
      requestor: permissions.requestor,
    })
      .unwrap()
      .then(() => {
        toast.success(
          `Access granted for the user ${getTruncatedAddress(
            permissions.requestor
          )}`,
          {
            onAutoClose: () => {
              dispatch(resetPermissionsInput());
            },
            onDismiss: () => {
              dispatch(resetPermissionsInput());
            },
          }
        );
        handleClose();
        if (window.location.pathname === '/profile') {
          navigate(-1); // Navigate back to previous page if the current page is profile
        }
      });
  };

  return (
    <AppModal
      title="Access Settings"
      withInfo
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-5">
        <div>
          <div className="text-[#29324A] text-sm mb-4">
            <span>Enter a wallet address or choose from</span>{' '}
            <Link
              to={{
                pathname: '/profile',
                search: createSearchParams({
                  tab: 'browse-users',
                  select: 'true',
                }).toString(),
              }}
              className="text-primary hover:underline"
            >
              the provided list
            </Link>
          </div>
          <TextInput
            placeholder="User hash"
            bgColor="#F6F8FB"
            size="lg"
            fullWidth
            value={permissions.requestor}
            onChange={(e) =>
              dispatch(
                setPermissionsInput({
                  input: 'requestor',
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="flex flex-col gap-5 mt-3">
          <CustomButton
            text="Add access"
            size="lg"
            icon="lock"
            fullWidth
            isLoading={isLoading}
            onClick={handleGrantPermission}
            disabled={!permissions.requestor || !permissions.datasetID}
          />
          <CustomButton
            text="Choose a user"
            size="lg"
            btnStyle="outline-primary"
            fullWidth
            isLoading={isLoading}
            onClick={() => navigate('/profile?tab=browse-users&select=true')}
          />
        </div>
      </div>
    </AppModal>
  );
};

export default AddAccessModal;
