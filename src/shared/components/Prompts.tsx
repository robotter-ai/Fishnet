import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import useModal from '@shared/hooks/useModal';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  changeExecutionDetails,
  postExecutionRequest,
  resetExecutionDetails,
} from '@slices/executionSlice';
import { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCheckbox } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

interface PromptInterface {
  title?: string;
  message?: string;
}

export const DeletePrompt: React.FC<PromptInterface> = ({ title, message }) => {
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <>
      <div role="button" className="cursor-pointer" onClick={handleOpen}>
        <AiOutlineDelete size={24} color="#29324A" />
      </div>
      <AppModal
        title={title || 'The changes will not not be saved'}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="my-[20px]">
          <p>{message || 'Are you sure?'}</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text={message ? 'Yes' : 'Yes, delete'}
            btnStyle="outline-red"
            size="lg"
            fullWidth
          />
          <Button text="No, back" size="lg" fullWidth onClick={handleClose} />
        </div>
      </AppModal>
    </>
  );
};

export const ExecutePrompt: React.FC<{
  isSelect: boolean;
  selectedHash: string;
  against: 'data' | 'algorithm';
  disabled?: boolean;
}> = ({ isSelect, disabled, against, selectedHash }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.profile);
  const { details, success, isLoading } = useAppSelector(
    (state) => state.execution
  );
  const { isOpen, handleOpen, handleClose } = useModal();
  const { handleNavigateWithSelect } = useSelectData();

  useEffect(() => {
    dispatch(
      changeExecutionDetails({
        input: 'owner',
        value: userInfo?.username || '',
      })
    );
    if (success) {
      dispatch(resetExecutionDetails());
    }
  }, [success]);

  const handleSelect = () => {
    handleNavigateWithSelect(against === 'data' ? '/data' : '/algorithms');
  };

  return (
    <>
      <Button
        text={isSelect ? 'Select' : 'Use'}
        btnStyle="outline-blue"
        onClick={() => {
          dispatch(
            changeExecutionDetails({
              input: against === 'data' ? 'algorithmID' : 'datasetID',
              value: selectedHash,
            })
          );
          handleOpen();
        }}
        disabled={disabled}
      />
      <AppModal
        title="Execute"
        isOpen={isOpen}
        handleClose={handleClose}
        withHeader={!isLoading}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <h1>Pending execution</h1>
            <div className="p-4">
              <FadeLoader color="#0054ff" height={15} margin={-2.5} width={3} />
            </div>
            <p>Please wait ~ 10 sec</p>
          </div>
        ) : null}
        {success ? (
          <div className="flex flex-col items-center gap-4">
            <h1>Executed</h1>
          </div>
        ) : null}
        {!isLoading && !success ? (
          <>
            <div className="mb-[25px] flex flex-col gap-5">
              <TextInput
                label={`Paste a hash of the ${against}, that will be applied to the ${
                  against === 'data' ? 'algorithm' : 'data'
                }`}
                placeholder={`Hash of ${against}`}
                bgColor="#F6F8FB"
                value={
                  against === 'data' ? details.datasetID : details.algorithmID
                }
                onChange={(e) =>
                  dispatch(
                    changeExecutionDetails({
                      input: against === 'data' ? 'datasetID' : 'algorithmID',
                      value: e.target.value,
                    })
                  )
                }
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button
                text={`Select ${against}`}
                btnStyle="outline-blue"
                size="lg"
                fullWidth
                onClick={handleSelect}
                withoutBorder
              />
              <Button
                text="Apply"
                size="lg"
                isLoading={isLoading}
                onClick={() => dispatch(postExecutionRequest(details))}
                fullWidth
              />
            </div>
          </>
        ) : null}
      </AppModal>
    </>
  );
};

export const PublishedModal: React.FC<{
  title: string;
  hash: string;
  publishedName: string;
  isOpen: boolean;
  handleClose: () => void;
  backTo: '/data' | '/algorithms';
}> = ({ title, hash, publishedName, isOpen, handleClose, backTo }) => {
  const navigate = useNavigate();

  const handleEditRecord = () => {
    handleClose();
  };

  const handleBackTo = () => {
    handleClose();
    navigate(backTo);
  };

  return (
    <AppModal
      title="Select file (.csv)"
      isOpen={isOpen}
      handleClose={handleClose}
      withInfo
      withHeader={false}
    >
      <div className="flex flex-col items-center gap-4">
        <h1>{title} published!</h1>
        <IoCheckbox className="text-blue" size={70} />
        <p>{publishedName} published</p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-blue w-[400px] truncate select-none">{hash}</p>
          <ClickToCopy text={hash} color="#0458FF" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-7">
        <Button
          text={`Edit ${title.toLowerCase()}`}
          size="lg"
          btnStyle="outline-blue"
          fullWidth
          onClick={handleEditRecord}
        />
        <Button
          text={`My ${title}`}
          size="lg"
          fullWidth
          onClick={handleBackTo}
        />
      </div>
    </AppModal>
  );
};
