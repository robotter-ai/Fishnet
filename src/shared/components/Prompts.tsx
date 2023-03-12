import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import useModal from '@shared/hooks/useModal';
import useSelectData from '@shared/hooks/useSelectData';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCheckbox } from 'react-icons/io5';
import { VscCheck } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

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
  disabled?: boolean;
}> = ({ isSelect, disabled }) => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const { handleNavigateWithSelect } = useSelectData();

  const handleSelectAlgorithm = () => {
    handleNavigateWithSelect('/algorithms');
    handleClose();
  };

  return (
    <>
      <Button
        text={isSelect ? 'Select' : 'Use'}
        btnStyle="outline-blue"
        onClick={handleOpen}
        disabled={disabled}
      />
      <AppModal title="Execute" isOpen={isOpen} handleClose={handleClose}>
        <div className="mb-[25px] flex flex-col gap-5">
          <p>Paste a hash of the Algorithm, that will be applied to the data</p>
          <div className="bg-[#F6F8FB] flex gap-2 justify-between rounded-lg px-5 py-3">
            <p className="text-lg truncate">
              8743b52063cd84097a65d1633f5c74f552063ccd97a65
            </p>
            <VscCheck size={25} color="#0458FF" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="Select algorithm"
            btnStyle="outline-blue"
            size="lg"
            fullWidth
            onClick={handleSelectAlgorithm}
          />
          <Button text="Apply" size="lg" fullWidth />
        </div>
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
