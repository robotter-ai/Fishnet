import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import DataSummary from '@shared/components/Summary';
import ViewLoader from '@shared/components/ViewLoader';
import { useAppDispatch } from '@shared/hooks/useStore';
import dayjs from 'dayjs';
import { IoCheckbox } from 'react-icons/io5';
import { RxCaretLeft } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import TruncatedItemHash from '@shared/components/TruncatedItemHash';
import { useAuth } from '@contexts/auth-provider';
import { IDataset } from '@store/data/types';
import { useRequestDatasetPermissionsMutation } from '@store/monitor-access/api';
import { setPermissionsInput } from '@store/monitor-access/slice';
import useTransaction from '@shared/hooks/useTransaction';
import CustomButton from '@components/ui/Button';
import useDownloadDataset from './hooks/useDownloadDataset';
import useDataDetails from './hooks/useDataDetails';
import TimeseriesCharts from './components/TimeseriesCharts';

const DataDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { address } = useAuth();

  const {
    dataset,
    handleOnChange,
    isUpload,
    handleUploadDataset,
    handleUpdateDataset,
    isLoadingUploadDataset,
    isLoadingUpdateDataset,
    isLoadingPublishedTimeseries,
    publishedModalProps: { isOpen, handleClose },
    isLoadingGetDataset,
    isOwner,
  } = useDataDetails();
  const { handleDownload, isLoading: isDownloading } = useDownloadDataset();
  const { handlePurchase } = useTransaction();

  const [requestPermissions, { isLoading: isLoadingRequestPermissions }] =
    useRequestDatasetPermissionsMutation();

  if (!!dataset && dataset.price === undefined) {
    dataset.price = 0;
  }

  const SUMMARY = [
    {
      name: 'Aleph item hash',
      value: <TruncatedItemHash hash={dataset?.item_hash} copy />,
    },
    ...(!isOwner
      ? [
          {
            name: 'Name',
            value: dataset?.name || 'unnamed dataset',
          },
        ]
      : []),
    {
      name: 'Creation date',
      value: (
        <p>
          {dayjs
            .unix(dataset?.timestamp || Date.now() / 1000)
            .format('DD/MM/YYYY')}
        </p>
      ),
    },
    ...(isOwner
      ? [
          {
            name: 'Total Sold',
            value: <p>0 USDC</p>,
          },
          {
            name: 'Current Price',
            value: <p>{dataset?.price} USDC</p>,
          },
          {
            name: 'Owner',
            value: <TruncatedAddress address={dataset?.owner} copy />,
          },
        ]
      : [
          {
            name: 'Seller',
            value: <TruncatedAddress address={dataset?.owner} copy />,
          },
          {
            name: 'Current Price',
            value: <p>{dataset?.price} USDC</p>,
          },
          {
            name: 'Description',
            value: dataset?.desc,
          },
        ]),
  ];

  const action = () => {
    if (address === '') {
      return (
        <CustomButton
          text="Wallet required"
          size="md"
          icon="lock"
          btnStyle="outline-primary"
          disabled
        />
      );
    }
    if (isUpload) {
      return (
        <CustomButton
          text="Publish"
          icon="upload"
          size="md"
          isLoading={isLoadingUploadDataset as boolean}
          onClick={handleUploadDataset}
          disabled={!dataset?.name}
        />
      );
    }
    if (isOwner) {
      return (
        <CustomButton
          text="Save"
          icon="box"
          size="md"
          isLoading={isLoadingUpdateDataset}
          onClick={handleUpdateDataset}
          disabled={!dataset?.name || !dataset?.price}
        />
      );
    }
    if (dataset.price === 0 || dataset?.permission_status === 'GRANTED') {
      return (
        <CustomButton
          text="Download"
          size="md"
          icon="download"
          btnStyle="outline-primary"
          isLoading={isDownloading}
          onClick={() => handleDownload(dataset as IDataset)}
        />
      );
    }
    if (!dataset?.available || !(dataset?.permission_status === 'GRANTED')) {
      return (
        <div className="flex items-center space-x-4">
          <CustomButton
            text="Request access"
            size="md"
            icon="lock"
            btnStyle="outline-primary"
            onClick={() => {
              dispatch(
                setPermissionsInput({
                  input: 'requestor',
                  value: address,
                })
              );
              requestPermissions({ dataset_id: dataset?.item_hash });
            }}
            isLoading={
              dataset?.permission_status === 'REQUESTED' ||
              isLoadingRequestPermissions
            }
            className="w-32"
          />
          <CustomButton
            text="Buy"
            size="md"
            icon="buy"
            btnStyle="solid-secondary"
            onClick={() => handlePurchase(dataset.item_hash)}
            className="w-32"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center text-primary"
          >
            <RxCaretLeft size={30} />
            Back
          </button>
        </div>
        <div>{action()}</div>
      </div>
      <div className="relative">
        <ViewLoader
          isLoading={isLoadingGetDataset || isLoadingPublishedTimeseries}
        />
        {isOwner ? (
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="bg-form-bg flex flex-col gap-4 p-6 text-text-dark rounded-[32px]">
              <TextInput
                label="Title"
                placeholder="Please provide a title"
                value={dataset?.name}
                onChange={(e) => handleOnChange('name', e.target.value)}
                fullWidth
                mandatory={isUpload || isOwner}
              />
              <TextInput
                label="Price"
                placeholder="Set a price for your data"
                type="number"
                value={dataset.price}
                onChange={({ target: { value } }) => {
                  // Check if the value starts with 0
                  if (/^0/.test(value) && value.length > 1) {
                    value = value.replace(/^0/, '');
                  }
                  handleOnChange('price', value);
                }}
                fullWidth
                trail="USDC"
              />
              <TextInput
                label="Description"
                placeholder="What is the data about?"
                value={dataset?.desc || ''}
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
            {dataset?.name || 'unnamed dataset'}{' '}
            {isUpload ? 'published' : 'updated'}
          </p>
          <div className="flex flex-col items-center gap-2">
            <TruncatedItemHash
              hash={dataset?.item_hash || ''}
              color="primary"
              copy
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-7">
          <CustomButton
            text="Edit"
            size="lg"
            icon="edit"
            btnStyle="outline-primary"
            fullWidth
            onClick={() => {
              navigate(`/data/${dataset?.item_hash}`);
              handleClose();
            }}
          />
          <CustomButton
            text="Home"
            size="lg"
            fullWidth
            icon="home"
            onClick={() => navigate('/')}
          />
        </div>
      </AppModal>
    </div>
  );
};

export default DataDetails;
