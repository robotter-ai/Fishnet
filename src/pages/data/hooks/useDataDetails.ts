import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import {
  IUploadDataset,
  useGenerateViewsMutation,
  useGetDatasetQuery,
  useUpdateDatasetMutation,
  useUploadDatasetMutation,
} from '@slices/dataSlice';
import { useParams } from 'react-router-dom';
import useAuth from '@shared/hooks/useAuth';
import {
  initProductTree as initProductTreeTransaction,
  resetTransactionSlice,
} from '@slices/transactionSlice';
import {
  FISHNET_MARKETPLACE,
  SOLANA_CONNECTION,
  USDC_MINT,
} from '@shared/constant';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import useOwner from '@shared/hooks/useOwner';

export default () => {
  const { id } = useParams();
  const { setTitle, getTitle } = usePageTitle();
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<Record<string, any>>({
    name: '',
    price: 0,
  });
  const { uploadDatasetActions, updateDatasetsActions, generateViewActions } =
    useAppSelector((app) => app.datasets);
  const { initProductTree } = useAppSelector((app) => app.transaction);
  const { timeseries } = useAppSelector((state) => state.timeseries);
  const { sendTransaction } = useWallet();
  const { isOpen, handleOpen, handleClose } = useModal();
  const [signature, setSignature] = useState<string>('');
  const { isOwner } = useOwner(inputs?.owner);

  const isUpload = (id && id === 'upload') as boolean;

  // START: RTK Query
  const {
    data,
    isLoading: isLoadingGetDataset,
    isSuccess: isGetDatasetSuccess,
  } = useGetDatasetQuery(
    { dataset_id: id as string, view_as: auth.address },
    { skip: isUpload }
  );
  const [
    uploadDataset,
    {
      data: uploadedData,
      isLoading: isLoadingUploadDataset,
      isSuccess: isSuccessUploadDataset,
    },
  ] = useUploadDatasetMutation();
  const [generateViews, { isLoading: isLoadingGenerateViews }] =
    useGenerateViewsMutation();
  const [updateDataset, { isLoading: isLoadingUpdateDataset }] =
    useUpdateDatasetMutation();

  useEffect(() => {
    if (isGetDatasetSuccess) {
      setInputs(data);
      setTitle(data?.name);
    } else {
      setInputs({
        name: getTitle(),
        price: 0,
      });
      handleOnChange('owner', auth?.address);
    }
  }, [isGetDatasetSuccess]);

  useEffect(() => {
    if (
      uploadedData?.dataset?.item_hash !== (undefined || null) &&
      isSuccessUploadDataset &&
      initProductTree.transaction === null &&
      signature === ''
    ) {
      const config = {
        params: {
          signer: auth.address,
          marketplace: FISHNET_MARKETPLACE,
          paymentMint: USDC_MINT,
          params: {
            id: uploadedData?.dataset?.item_hash as string,
            productPrice: Number(uploadedData?.dataset?.price),
            feeBasisPoints: 0,
            height: 5,
            buffer: 8,
            canopy: 0,
            name: String(uploadedData?.dataset?.name),
            metadataUrl: `https://api1.aleph.im/api/v0/messages.json?hashes=${uploadedData?.dataset?.item_hash}`,
          },
        },
      };
      dispatch(initProductTreeTransaction(config));
    }
  }, [JSON.stringify(uploadedData), isSuccessUploadDataset]);

  useEffect(() => {
    if (initProductTree.transaction && initProductTree.success && !signature) {
      const serializedBase64 = initProductTree.transaction;
      const serializedBuffer = Buffer.from(serializedBase64, 'base64');
      const transaction = VersionedTransaction.deserialize(serializedBuffer);

      const processTransaction = async () => {
        try {
          const signatureToUse = await sendTransaction(
            transaction,
            SOLANA_CONNECTION,
            {
              skipPreflight: true,
            }
          );
          setSignature(signatureToUse);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error sending transaction:', error);
        }
      };

      processTransaction();
      dispatch(resetTransactionSlice());
    }
  }, [initProductTree.transaction, initProductTree.success]);

  const inputsToUpload: IUploadDataset = {
    desc: inputs?.desc,
    name: inputs?.name,
    owner: inputs?.owner,
    price: String(inputs?.price),
    ...(inputs?.item_hash
      ? {
          item_hash: inputs?.item_hash,
          timeseriesIDs: inputs?.timeseriesIDs,
          ownsAllTimeseries: inputs?.ownsAllTimeseries,
        }
      : { timeseriesIDs: [], ownsAllTimeseries: true }),
  };

  const handleUploadDataset = () => {
    // check if dataset name is set
    if (!inputsToUpload?.name) {
      // stop execution and outline the input field
      return;
    }
    const timeseriesToUse = timeseries.map((item: any) => ({
      name: item.name,
      owner: item.owner,
      desc: item.desc,
      data: item.data,
    }));
    uploadDataset({
      dataset: inputsToUpload,
      timeseries: timeseriesToUse,
    }).then((res: any) => {
      setInputs(res?.data?.dataset);
      handleGenerateViews(res?.data?.dataset);
    });
  };

  const handleUpdateDataset = () => {
    updateDataset(inputsToUpload).then(() => {
      handleOpen();
    });
  };

  const handleGenerateViews = (res: any) => {
    const time: number[] = timeseries[0].data
      .map((x: any[]) => x[0])
      .sort((a: number, b: number) => a - b);
    const timeseriesToUse = [
      {
        timeseriesIDs: res?.timeseriesIDs,
        granularity: 'YEAR',
        startTime: time[0],
        endTime: time[time.length - 1],
      },
    ];
    generateViews({ dataset_id: res?.item_hash, data: timeseriesToUse }).then(
      () => {
        handleOpen();
      }
    );
  };

  const handleOnChange = (input: string, value: any) => {
    if (input === 'price') {
      // should not be below 0 or empty
      value = value < 0 ? 0 : value;
    }
    setInputs((prevState) => ({ ...prevState, [input]: value }));
    if (input === 'name') {
      setTitle(value);
    }
  };

  return {
    inputs,
    handleOnChange,
    handleUploadDataset,
    handleUpdateDataset,
    isLoadingGetDataset,
    isLoadingUploadDataset:
      isLoadingUploadDataset ||
      isLoadingGenerateViews ||
      initProductTree.success,
    isLoadingUpdateDataset,
    isLoading: uploadDatasetActions.isLoading || generateViewActions.isLoading,
    isUpload,
    publishedModalProps: { handleClose, isOpen, handleOpen },
    updateDatasetsActions,
    isOwner,
  };
};
