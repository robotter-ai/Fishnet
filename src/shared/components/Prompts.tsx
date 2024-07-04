import { TrashIcon } from '@assets/icons';
import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import useModal from '@shared/hooks/useModal';
import React, { useEffect } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IDeletePrompt {
  title?: string;
  message?: string;
  completed?: boolean;
  isLoading?: boolean;
  button?: (handleOpen: () => void) => React.ReactNode;
  onConfirm?: () => void;
}

export const DeletePrompt: React.FC<IDeletePrompt> = ({
  title,
  message,
  completed,
  button,
  isLoading,
  onConfirm,
}) => {
  const { isOpen, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (completed) {
      handleClose();
    }
  }, [completed]);

  return (
    <>
      {button ? (
        button(handleOpen)
      ) : (
        <div role="button" className="cursor-pointer" onClick={handleOpen}>
          <TrashIcon />
        </div>
      )}
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
            isLoading={isLoading}
            onClick={onConfirm}
          />
          <Button
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

export const PublishedModal: React.FC<{
  title: string;
  hash: string;
  publishedName: string;
  isOpen: boolean;
  handleClose: () => void;
  backTo: '/' | '/algorithms';
}> = ({ title, hash, publishedName, isOpen, handleClose, backTo }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleEditRecord = () => {
    if (backTo === '/algorithms') {
      searchParams.set('details', hash);
      setSearchParams(searchParams);
    }
    handleClose();
  };

  const handleBackTo = () => {
    handleClose();
    navigate(backTo);
  };

  return (
    <AppModal
      isOpen={isOpen}
      handleClose={handleClose}
      withInfo
      withHeader={false}
    >
      <div className="flex flex-col items-center gap-4">
        <h1>{title} published!</h1>
        <IoCheckbox className="text-primary" size={70} />
        <p>{publishedName} published</p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-primary w-[400px] truncate select-none">{hash}</p>
          <ClickToCopy text={hash} color="#1DC3CF" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-7">
        <Button
          text={`Edit ${title.toLowerCase()}`}
          size="lg"
          btnStyle="outline-primary"
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
