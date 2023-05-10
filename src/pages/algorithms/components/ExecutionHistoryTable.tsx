import ClickToCopy from '@shared/components/ClickToCopy';
import { StatusIdentifier } from '@shared/constant';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import dayjs from 'dayjs';
import AppModal from '@components/ui/AppModal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { getExecutionResultByID } from '@slices/algorithmSlice';
import CustomButton from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import ViewLoader from '@shared/components/ViewLoader';

const COLUMNS = (dispatch: any, handleOpen: () => void): ITableColumns[] => [
  {
    header: 'Execution Date',
    cell: ({ timestamp }) => (
      <p className="whitespace-nowrap">
        {dayjs.unix(timestamp).format('YYYY-MM-DD HH:MM')}
      </p>
    ),
    isSortable: true,
  },
  {
    header: 'Hash of data',
    cell: ({ datasetID }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{datasetID}</p>
        <ClickToCopy text={datasetID} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Hash of algorithm',
    cell: ({ algorithmID }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{algorithmID}</p>
        <ClickToCopy text={algorithmID} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Result',
    cell: ({ status }) => <StatusIdentifier status={status} />,
    isSortable: true,
  },
  {
    header: 'Filter',
    cell: ({ resultID }) => (
      <div className="flex gap-3 justify-end">
        <CustomButton
          text="Result"
          btnStyle="outline-blue"
          onClick={() => {
            dispatch(getExecutionResultByID(resultID));
            handleOpen();
          }}
        />
      </div>
    ),
  },
];

const ExecutionHistoryTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { executionActions, executionResult } = useAppSelector(
    (state) => state.algorithm
  );
  const { isOpen, handleClose, handleOpen } = useModal();

  return (
    <>
      <CustomTable
        data={data}
        columns={COLUMNS(dispatch, handleOpen)}
        isLoading={isLoading}
      />
      <AppModal
        title="Result"
        isOpen={isOpen}
        handleClose={handleClose}
        fullWidth
      >
        <div className="bg-[#f3f3f3] w-full min-h-[40px] rounded mt-4 relative p-4 overflow-auto">
          <ViewLoader isLoading={executionActions.isLoading} />
          <pre>
            {!executionActions.isLoading &&
              JSON.stringify({ ...executionResult }, null, 2)}
          </pre>
        </div>
        <div className="flex justify-center mt-5">
          <CustomButton text="Okay" size="lg" onClick={handleClose} />
        </div>
      </AppModal>
    </>
  );
};

export default ExecutionHistoryTable;
