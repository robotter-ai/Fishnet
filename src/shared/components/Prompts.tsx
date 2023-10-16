import { TrashIcon } from '@assets/icons';
import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import useAuth from '@shared/hooks/useAuth';
import useModal from '@shared/hooks/useModal';
import useSelectData from '@shared/hooks/useSelectData';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  changeExecutionDetails,
  postExecutionRequest,
  resetExecutionDetails,
} from '@slices/executionSlice';
import { useEffect, useState } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

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

// export const ExecutePrompt: React.FC<{
//   selectedHash: string;
//   against: 'data' | 'algorithm';
//   disabled?: boolean;
//   btnStyle?: 'solid' | 'thin';
//   btnSize?: 'sm' | 'md';
// }> = ({ disabled, against, selectedHash, btnStyle, btnSize = 'sm' }) => {
//   const dispatch = useAppDispatch();
//   const auth = useAuth();
//   const { details, success, isLoading, result } = useAppSelector(
//     (state) => state.execution
//   );
//   const { isOpen, handleOpen, handleClose } = useModal();
//   const { isSelect, handleNavigateWithSelect } = useSelectData();
//   const [isExecuted, setIsExecuted] = useState(false);

//   useEffect(() => {
//     dispatch(
//       changeExecutionDetails({
//         input: 'owner',
//         value: auth?.address,
//       })
//     );
//     if (success) {
//       dispatch(resetExecutionDetails());
//     }
//   }, [success]);

//   const handleSelect = () => {
//     handleNavigateWithSelect(against === 'data' ? '/data' : '/algorithms');
//   };

//   return (
//     <>
//       {btnStyle === 'solid' ? (
//         <Button
//           text={isSelect ? 'Select' : 'Use'}
//           size="lg"
//           onClick={() => {
//             dispatch(
//               changeExecutionDetails({
//                 input: against === 'data' ? 'algorithmID' : 'datasetID',
//                 value: selectedHash,
//               })
//             );
//             handleOpen();
//           }}
//           disabled={disabled}
//         />
//       ) : (
//         <div className="w-full flex justify-end">
//           <Button
//             text={isSelect ? 'Select' : 'Use'}
//             size={btnSize}
//             btnStyle="outline-primary"
//             onClick={() => {
//               dispatch(
//                 changeExecutionDetails({
//                   input: against === 'data' ? 'algorithmID' : 'datasetID',
//                   value: selectedHash,
//                 })
//               );
//               handleOpen();
//             }}
//             disabled={disabled}
//           />
//         </div>
//       )}
//       <AppModal
//         title={isExecuted ? 'Result' : 'Execute'}
//         isOpen={isOpen}
//         handleClose={handleClose}
//         withHeader={!isLoading}
//         fullWidth={isExecuted}
//       >
//         {isLoading ? (
//           <div className="flex flex-col items-center gap-4">
//             <h1>Pending execution</h1>
//             <div className="p-4">
//               <FadeLoader color="#1DC3CF" height={15} margin={-2.5} width={3} />
//             </div>
//             <p>Please wait</p>
//           </div>
//         ) : null}
//         {isExecuted ? (
//           <div>
//             <div className="bg-[#f3f3f3] w-full min-h-[40px] rounded mt-4 relative p-4 overflow-auto">
//               <pre>{JSON.stringify({ ...result }, null, 2)}</pre>
//             </div>
//             <div className="flex justify-center mt-5">
//               <Button text="Okay" size="lg" onClick={handleClose} />
//             </div>
//           </div>
//         ) : null}
//         {!isLoading && !isExecuted ? (
//           <>
//             <div className="mb-[25px] flex flex-col gap-5">
//               <TextInput
//                 label={`Paste a hash of the ${against}, that will be applied to the ${
//                   against === 'data' ? 'algorithm' : 'data'
//                 }`}
//                 placeholder={`Hash of ${against}`}
//                 bgColor="#F6F8FB"
//                 value={
//                   against === 'data' ? details.datasetID : details.algorithmID
//                 }
//                 onChange={(e) =>
//                   dispatch(
//                     changeExecutionDetails({
//                       input: against === 'data' ? 'datasetID' : 'algorithmID',
//                       value: e.target.value,
//                     })
//                   )
//                 }
//                 fullWidth
//               />
//             </div>
//             <div className="flex flex-col gap-4">
//               <Button
//                 text={`Select ${against}`}
//                 btnStyle="outline-primary"
//                 size="lg"
//                 fullWidth
//                 onClick={handleSelect}
//                 withoutBorder
//               />
//               <Button
//                 text="Apply"
//                 size="lg"
//                 isLoading={isLoading}
//                 onClick={() =>
//                   dispatch(postExecutionRequest(details)).then(() =>
//                     setIsExecuted(true)
//                   )
//                 }
//                 fullWidth
//               />
//             </div>
//           </>
//         ) : null}
//       </AppModal>
//     </>
//   );
// };

export const PublishedModal: React.FC<{
  title: string;
  hash: string;
  publishedName: string;
  isOpen: boolean;
  handleClose: () => void;
  backTo: '/data' | '/algorithms';
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
