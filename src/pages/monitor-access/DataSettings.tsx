import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import CustomButton from '@components/ui/Button';
import { DeletePrompt } from '@shared/components/Prompts';
import useModal from '@shared/hooks/useModal';
import { RxCaretLeft } from 'react-icons/rx';
import { createSearchParams, Link } from 'react-router-dom';
import TableMapper from './components/SettingsTableMapper';
import useDataSettings from './hooks/useDataSettings';

const DataSettings = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    inputs,
    isLoading,
    datasetPermission,
    handleAddAccess,
    handleOnchangeInput,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  } = useDataSettings();

  return (
    <div id="data-settings">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Link to="/monitor-access" className="flex items-center text-blue">
            <RxCaretLeft size={30} />
            Back
          </Link>
        </div>
        <div>
          <CustomButton
            text="Add access"
            size="md"
            icon="lock"
            onClick={handleOpenAccessSettings}
          />
        </div>
      </div>
      <TableMapper
        datasetPermission={datasetPermission}
        handleOpenRefuseAccess={handleOpen}
      />
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
            value={inputs.requestor}
            onChange={(e) => handleOnchangeInput('requestor', e.target.value)}
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
            value={inputs.algorithmID}
            onChange={(e) => handleOnchangeInput('algorithmID', e.target.value)}
          />
          <TextInput
            label="How many times may  user use the data?"
            placeholder="Set the limit"
            bgColor="#F6F8FB"
            fullWidth
            value={inputs.requestedExecutionCount || ''}
            onChange={(e) =>
              handleOnchangeInput('requestedExecutionCount', e.target.value)
            }
          />
          <div className="mt-3">
            <CustomButton
              text="Add"
              size="lg"
              fullWidth
              isLoading={isLoading}
              onClick={handleAddAccess}
            />
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default DataSettings;
