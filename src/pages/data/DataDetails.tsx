import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import DataSummary from '@shared/components/Summary';
import ViewLoader from '@shared/components/ViewLoader';
import useAuth from '@shared/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  changeDatasetPermissionInput,
  requestDatasetPermissions,
} from '@slices/monitorAccessSlice';
import dayjs from 'dayjs';
import { IoCheckbox } from 'react-icons/io5';
import { RxCaretLeft } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import { downloadTimeseries as downloadTimeseriesRequest } from '@slices/timeseriesSlice';
import TimeseriesCharts from './components/TimeseriesCharts';
import useDataDetails from './hooks/useDataDetails';

const DataDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDownload = (timeseriesIDs: string[]) => {
    dispatch(downloadTimeseriesRequest(timeseriesIDs));
  };
  const auth = useAuth();
  const { requestDatasetPermissionActions } = useAppSelector(
    (state) => state.monitorAccess
  );
  const {
    inputs,
    handleOnChange,
    isUpload,
    handleUploadDataset,
    handleUpdateDataset,
    isLoadingUploadDataset,
    isLoadingUpdateDataset,
    isLoading,
    publishedModalProps: { isOpen, handleClose },
    isLoadingGetDataset,
    isOwner,
  } = useDataDetails();

  const SUMMARY = [
    {
      name: 'Hash of the data',
      value: <TruncatedAddress hash={inputs?.item_hash} copy />,
    },
    ...(!isOwner
      ? [
          {
            name: 'Name',
            value: inputs?.name || 'unnamed dataset',
          },
        ]
      : []),
    {
      name: 'Creation date',
      value: (
        <p>
          {dayjs
            .unix(inputs?.timestamp || Date.now() / 1000)
            .format('DD/MM/YYYY')}
        </p>
      ),
    },
    {
      name: 'Downloads',
      value: <p>0</p>,
    },
    ...(isOwner
      ? [
          {
            name: 'Total Sold',
            value: <p>0 USDC</p>,
          },
          {
            name: 'Current Price',
            value: <p>{inputs?.price} USDC</p>,
          },
          {
            name: 'Owners address',
            value: <TruncatedAddress hash={inputs?.owner} copy />,
          },
        ]
      : [
          {
            name: 'Sellers wallet',
            value: <TruncatedAddress hash={inputs?.owner} copy />,
          },
          {
            name: 'Current Price',
            value: <p>{inputs?.price} USDC</p>,
          },
          {
            name: 'Description',
            value: inputs?.desc,
          },
        ]),
  ];

  const action = () => {
    if (isUpload) {
      return (
        <Button
          text="Publish"
          icon="upload"
          size="md"
          isLoading={isLoadingUploadDataset as boolean}
          onClick={handleUploadDataset}
          disabled={!inputs?.name || !inputs?.price}
        />
      );
    }
    if (isOwner) {
      return (
        <Button
          text="Save"
          icon="box"
          size="md"
          isLoading={isLoadingUpdateDataset}
          onClick={handleUpdateDataset}
          disabled={!inputs?.name || !inputs?.price}
        />
      );
    }
    if (inputs?.available || inputs?.permission_status === 'GRANTED') {
      return (
        <Button
          text="Download"
          size="md"
          icon="download"
          btnStyle="outline-primary"
          isLoading={isLoading}
          onClick={() => handleDownload(inputs.timeseriesIDs)}
        />
      );
    }
    if (!inputs?.available || !(inputs?.permission_status === 'GRANTED')) {
      return (
        <Button
          text="Request access"
          size="md"
          icon="lock"
          btnStyle="outline-primary"
          onClick={() => {
            dispatch(
              changeDatasetPermissionInput({
                input: 'requestor',
                value: auth.address,
              })
            );
            dispatch(requestDatasetPermissions(inputs?.item_hash));
          }}
          isLoading={
            inputs?.permission_status === 'REQUESTED' ||
            requestDatasetPermissionActions.isLoading
          }
        />
      );
    }
    return <>Test</>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Link
            to=".."
            onClick={() => navigate(-1)}
            className="flex items-center text-primary"
          >
            <RxCaretLeft size={30} />
            Back
          </Link>
        </div>
        <div>{action()}</div>
      </div>
      <div className="relative">
        <ViewLoader isLoading={isLoadingGetDataset} />
        {isOwner ? (
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="bg-form-bg flex flex-col gap-4 p-6 text-text-dark rounded-[32px]">
              <TextInput
                label="Title"
                placeholder="Please provide a title"
                value={inputs?.name || ''}
                onChange={(e) => handleOnChange('name', e.target.value)}
                fullWidth
                mandatory={isUpload || isOwner}
              />
              <TextInput
                label="Price"
                placeholder="Set a price for your data"
                type="number"
                value={inputs?.price || '0'}
                onChange={(e) => handleOnChange('price', e.target.value)}
                fullWidth
                trail="USDC"
              />
              <TextInput
                label="Description"
                placeholder="What is the data about?"
                value={inputs?.desc || ''}
                onChange={(e) => handleOnChange('desc', e.target.value)}
                fullWidth
              />
            </div>
            <DataSummary summary={SUMMARY} />
          </div>
        ) : null}
        <TimeseriesCharts isOwner={isOwner} summary={SUMMARY} />
      </div>

      <AppModal
        isOpen={isOpen}
        handleClose={handleClose}
        withInfo
        withHeader={false}
      >
        <div className="flex flex-col items-center gap-4">
          <h1>Data {isUpload ? 'published' : 'updated'}!</h1>
          <IoCheckbox className="text-primary" size={70} />
          <p>
            {inputs?.name || 'unnamed dataset'} {isUpload ? 'published' : 'updated'}
          </p>
          <div className="flex flex-col items-center gap-2">
            <TruncatedAddress hash={inputs?.item_hash || ''} color="primary" />
            <ClickToCopy text={inputs?.item_hash || ''} color="#1DC3CF" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-7">
          <Button
            text="Edit"
            size="lg"
            icon="edit"
            btnStyle="outline-primary"
            fullWidth
            onClick={() => {
              navigate(`/data/${inputs?.item_hash}/details`);
              handleClose();
            }}
          />
          <Button
            text="Home"
            size="lg"
            fullWidth
            icon="home"
            onClick={() => navigate('/data')}
          />
        </div>
      </AppModal>
    </div>
  );
};

export default DataDetails;
