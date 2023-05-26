import { RxCaretLeft } from 'react-icons/rx';
import { IoCheckbox } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import TextInput from '@components/form/TextInput';
import ClickToCopy from '@shared/components/ClickToCopy';
import dayjs from 'dayjs';
import DataSummary from '@shared/components/Summary';
import ViewLoader from '@shared/components/ViewLoader';
import useOwner from '@shared/hooks/useOwner';
import { ExecutePrompt } from '@shared/components/Prompts';
import AddressWrap from '@shared/components/AddressWrap';
import useDataDetails from './hooks/useDataDetails';
import TimeseriesCharts from './components/TimeseriesCharts';

const DataDetails = () => {
  const navigate = useNavigate();
  const {
    handleOnChange,
    isPublished,
    handleUploadDataset,
    isLoading,
    publishedModalProps,
    dataDetails,
    datasetByIDActions,
  } = useDataDetails();
  const { isOwner } = useOwner(dataDetails?.owner);
  const { isOpen, handleClose } = publishedModalProps;

  const summary = [
    {
      name: 'Hash',
      value: (
        <div className="flex items-center gap-[11px]">
          <p className="w-[200px] truncate">{dataDetails?.item_hash || ''}</p>
          <ClickToCopy text={dataDetails?.item_hash} />
        </div>
      ),
    },
    {
      name: 'Owner',
      value: <AddressWrap hash={dataDetails?.owner} />,
    },
    {
      name: 'Creation date',
      value: (
        <p>
          {dayjs
            .unix(dataDetails?.timestamp || Date.now() / 1000)
            .format('DD/MM/YYYY')}
        </p>
      ),
    },
    {
      name: 'Usages',
      value: dataDetails?.current_revision || 0,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Link to="/data" className="flex items-center text-blue">
            <RxCaretLeft size={30} />
            Published
          </Link>
        </div>
        <div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {isPublished ? (
            isOwner ? (
              <div className="flex gap-4">
                <ExecutePrompt
                  btnSize="md"
                  against="algorithm"
                  selectedHash={dataDetails?.item_hash}
                />
                <Button
                  text="Save"
                  size="md"
                  isLoading={isLoading}
                  onClick={handleUploadDataset}
                />
              </div>
            ) : (
              <Button text="Access request" size="md" />
            )
          ) : (
            <Button
              text="Publish"
              size="md"
              isLoading={isLoading}
              onClick={handleUploadDataset}
            />
          )}
        </div>
      </div>
      <div className="relative">
        <ViewLoader isLoading={datasetByIDActions.isLoading} />
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-[#FAFAFA] flex flex-col gap-4 p-6 rounded-[10px]">
            <TextInput
              label="Data name"
              placeholder="Name the data"
              value={dataDetails?.name || ''}
              onChange={(e) => handleOnChange('name', e.target.value)}
              fullWidth
            />
            <TextInput
              label="Description"
              placeholder="What is the data about?"
              value={dataDetails?.desc || ''}
              onChange={(e) => handleOnChange('desc', e.target.value)}
              fullWidth
            />
          </div>
          <DataSummary summary={summary} />
        </div>
        <TimeseriesCharts />
      </div>
      <AppModal
        isOpen={isOpen}
        handleClose={handleClose}
        withInfo
        withHeader={false}
      >
        <div className="flex flex-col items-center gap-4">
          <h1>Data published!</h1>
          <IoCheckbox className="text-blue" size={70} />
          <p>{dataDetails?.name || ''} published</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-blue w-[400px] truncate select-none">
              {dataDetails?.item_hash || ''}
            </p>
            <ClickToCopy text={dataDetails?.item_hash || ''} color="#0458FF" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-7">
          <Button
            text="Edit data"
            size="lg"
            btnStyle="outline-blue"
            fullWidth
            onClick={() => {
              navigate(`/data/${dataDetails?.item_hash}/details`);
              handleClose();
            }}
          />
          <Button
            text="My Data"
            size="lg"
            fullWidth
            onClick={() => navigate('/data')}
          />
        </div>
      </AppModal>
    </div>
  );
};

export default DataDetails;
