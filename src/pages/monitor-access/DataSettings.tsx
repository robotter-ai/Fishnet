import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import CustomButton from '@components/ui/Button';
import { DeletePrompt } from '@shared/components/Prompts';
import useModal from '@shared/hooks/useModal';
import { MdAdd } from 'react-icons/md';
import { RxCaretLeft } from 'react-icons/rx';
import { createSearchParams, Link } from 'react-router-dom';
import TableMapper from './components/TableMapper';

const DataSettings = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: isOpenAccessSettings,
    handleOpen: handleOpenAccessSettings,
    handleClose: handleCloseAccessSettings,
  } = useModal();

  return (
    <div id="data-settings">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Link to="/monitor-access" className="flex items-center text-blue">
            <RxCaretLeft size={30} />
            Monitor access
          </Link>
        </div>
        <div>
          <CustomButton
            text="Add access"
            size="md"
            onClick={handleOpenAccessSettings}
          >
            <div className="flex gap-3 items-center">
              <MdAdd size={20} />
              <span>Add access</span>
            </div>
          </CustomButton>
        </div>
      </div>
      <TableMapper handleOpenRefuseAccess={handleOpen} />
      {/* <DeletePrompt
        isOpen={isOpen}
        handleClose={handleClose}
        title="Warning!"
        message="You want to refuse access. Are you sure?"
      /> */}
      <AppModal
        title="Access Settings"
        withInfo
        isOpen={isOpenAccessSettings}
        handleClose={handleCloseAccessSettings}
      >
        <div className="flex flex-col gap-5">
          <TextInput
            label={
              <div>
                <span>Paste a hash of user or</span>{' '}
                <Link
                  to={{
                    pathname: '/profile',
                    search: createSearchParams({
                      select: 'true',
                      tab: 'browse-users',
                    }).toString(),
                  }}
                  className="text-blue hover:underline"
                >
                  select from list
                </Link>
              </div>
            }
            placeholder="Hash of user (optional)"
            bgColor="#F6F8FB"
            fullWidth
          />
          <TextInput
            label={
              <div>
                <span>Paste a hash of algorithm or</span>{' '}
                <Link
                  to={{
                    pathname: '/algorithms',
                    search: createSearchParams({
                      select: 'true',
                    }).toString(),
                  }}
                  className="text-blue hover:underline"
                >
                  select from list
                </Link>
              </div>
            }
            placeholder="Hash of algorithm (optional)"
            bgColor="#F6F8FB"
            fullWidth
          />
          <TextInput
            label="How many times may  user use the data?"
            placeholder="Set the limit"
            bgColor="#F6F8FB"
            fullWidth
          />
          <div className="mt-3">
            <CustomButton text="Add" size="lg" fullWidth />
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default DataSettings;
