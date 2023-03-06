import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import useSelectData from '@shared/hooks/useSelectData';
import { VscCheck } from 'react-icons/vsc';

interface PromptInterface {
  isOpen: boolean;
  title?: string;
  message?: string;
  handleClose: () => void;
}

export const DeletePrompt: React.FC<PromptInterface> = ({
  isOpen,
  handleClose,
  title,
  message,
}) => {
  return (
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
  );
};

export const ExecutePrompt: React.FC<PromptInterface> = ({
  isOpen,
  handleClose,
}) => {
  const { handleNavigateWithSelect } = useSelectData();

  const handleSelectAlgorithm = () => {
    handleNavigateWithSelect('/algorithms');
    handleClose();
  };

  return (
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
  );
};
