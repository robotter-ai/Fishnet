import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import {
  IDataset,
  useGenerateViewsMutation,
  useGetDatasetQuery,
  useUpdateDatasetMutation,
  useUploadDatasetMutation,
} from '@slices/dataSlice';
import { useParams } from 'react-router-dom';
import useAuth from '@shared/hooks/useAuth';
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
  const [dataset, setDataset] = useState<Record<string, any>>({
    name: '',
    price: 0,
  });
  const { timeseries } = useAppSelector((state) => state.timeseries);
  const { sendTransaction } = useWallet();
  const { isOpen, handleOpen, handleClose } = useModal();
  const [signature, setSignature] = useState<string>('');
  const { isOwner } = useOwner(dataset?.owner);

  const isUpload = (id && id === 'upload') as boolean;

  // START: RTK Query
  const {
    data,
    isLoading: isLoadingGetDataset,
    isSuccess: isGetDatasetSuccess,
  } = useGetDatasetQuery(
    { datasetID: id as string, view_as: auth.address },
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
      setDataset(data);
      setTitle(data?.name);
    } else {
      setDataset({
        name: getTitle(),
        price: 0,
      });
      handleOnChange('owner', auth?.address);
    }
  }, [isGetDatasetSuccess]);

  useEffect(() => {
    if (
      uploadedData?.dataset?.item_hash !== null && isSuccessUploadDataset && initProductTree.transaction === null &&
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
      //@todo: inform user about transaction in modal
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

  const inputsToUpload: IDataset = {
    desc: dataset?.desc,
    name: dataset?.name,
    owner: dataset?.owner,
    price: String(dataset?.price),
    ...(dataset?.item_hash
      ? {
          item_hash: dataset?.item_hash,
          timeseriesIDs: dataset?.timeseriesIDs,
          ownsAllTimeseries: dataset?.ownsAllTimeseries,
        }
      : { timeseriesIDs: [], ownsAllTimeseries: true }),
  };

  const handleUploadDataset = () => {
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
      setDataset(res?.data?.dataset);
      handleGenerateViews(res?.data?.dataset);
    });
  };

  const handleUpdateDataset = () => {
    updateDataset(inputsToUpload).then(() => {
      handleOpen();
    });
  };

  const handleGenerateViews = (dataset: any) => {
    //@todo: check state of view components
    const time: number[] = timeseries[0].data
      .map((x: any[]) => x[0])
      .sort((a: number, b: number) => a - b);
    const timeseriesToUse = [
      {
        timeseriesIDs: dataset?.timeseriesIDs,
        granularity: 'YEAR',
        startTime: time[0],
        endTime: time[time.length - 1],
      },
    ];
    generateViews({ datasetID: dataset?.item_hash, data: timeseriesToUse }).then(
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
    setDataset((prevState) => ({ ...prevState, [input]: value }));
    if (input === 'name') {
      setTitle(value);
    }
  };

  const isLoading = isLoadingUploadDataset || isLoadingGenerateViews;

  return {
    dataset,
    handleOnChange,
    handleUploadDataset,
    handleUpdateDataset,
    isLoadingGetDataset,
    isLoadingUploadDataset:
      isLoadingUploadDataset ||
      isLoadingGenerateViews ||
      initProductTree.success,
    isLoadingUpdateDataset,
    isLoading,
    isUpload,
    publishedModalProps: { handleClose, isOpen, handleOpen },
    isOwner,
  };
};
