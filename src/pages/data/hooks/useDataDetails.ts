import { useEffect, useMemo, useRef, useState } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import {
  changeDataDetails,
  generateViews,
  getDatasetByID,
  getViews,
  resetDataDetails,
  resetDataSlice,
  updateDatasets,
  uploadDataset,
} from '@slices/dataSlice';
import { useParams } from 'react-router-dom';
import useAuth from '@shared/hooks/useAuth';
import { DataType, ViewValues } from '@slices/dataSlice/dataService';
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
  const { setTitle } = usePageTitle();
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const {
    dataDetails,
    views,
    uploadDatasetActions,
    datasetByIDActions,
    updateDatasetsActions,
    generateViewActions,
  } = useAppSelector((app) => app.datasets);
  const { initProductTree } = useAppSelector((app) => app.transaction);
  const { sendTransaction } = useWallet();
  const { requestDatasetPermissionActions } = useAppSelector(
    (state) => state.monitorAccess
  );
  const { isOpen, handleOpen, handleClose } = useModal();
  const isPublished = id && id !== 'upload';
  const [signature, setSignature] = useState<string>('');
  const { isOwner } = useOwner(dataDetails?.owner);
  const disabled = !isOwner;

  useEffect(() => {
    if (isPublished) {
      dispatch(getDatasetByID({ id, view_as: auth.address }));
    } else {
      dispatch(resetDataDetails());
    }
    dispatch(changeDataDetails({ name: 'owner', value: auth?.address }));
    dispatch(changeDataDetails({ name: 'ownsAllTimeseries', value: true }));
  }, [requestDatasetPermissionActions.success]);

  useEffect(() => {
    if (
      dataDetails?.item_hash !== (undefined || null) &&
      uploadDatasetActions.success &&
      initProductTree.transaction === null &&
      signature === '' 
    ) {
      const config = {
        params: {
          signer: auth.address,
          marketplace: FISHNET_MARKETPLACE,
          paymentMint: USDC_MINT,
          params: {
            id: dataDetails?.item_hash as string,
            productPrice: Number(dataDetails?.price),
            feeBasisPoints: 0,
            height: 5,
            buffer: 8,
            canopy: 0,
            name: String(dataDetails?.name),
            metadataUrl: `https://api1.aleph.im/api/v0/messages.json?hashes=${dataDetails?.item_hash}`,
          },
        },
      };
      dispatch(initProductTreeTransaction(config));
      handleGenerateViews(dataDetails?.item_hash);
    } else if (typeof id === 'string' && id !== 'upload') {
      handleGetViews(id);
      // handleGenerateViews(dataDetails?.item_hash);
    }
    localStorage.setItem('viewValues', views[0]);
  }, [uploadDatasetActions.success]);

  useEffect(() => {
    setTitle(dataDetails?.name, dataDetails?.permission_status);
  }, [dataDetails?.name]);

  useEffect(() => {
    if (
      initProductTree.transaction &&
      initProductTree.success &&
      !signature
    ) {
      const serializedBase64 = initProductTree.transaction;
      const serializedBuffer = Buffer.from(serializedBase64, 'base64');
      const transaction = VersionedTransaction.deserialize(serializedBuffer);

      const processTransaction = async () => {
        try {
          setSignature(await sendTransaction(transaction, SOLANA_CONNECTION));
        } catch (error) {
          console.error('Error sending transaction:', error);
        }
      };

      processTransaction();
      dispatch(resetTransactionSlice());
    }
  }, [initProductTree.transaction]);

  useEffect(() => {
    if (
      uploadDatasetActions.success &&
      initProductTree.success &&
      signature !== ''
    ) {
      handleOpen();
      dispatch(resetDataSlice());
    }
  }, [signature]);

  const handleUploadDataset = () => {
    dispatch(uploadDataset());
    const checkDatasetId = setInterval(() => {
      if (dataDetails?.item_hash) {
        dispatch(generateViews({ datasetId: dataDetails?.item_hash }));
        clearInterval(checkDatasetId);
      }
    }, 500);
  };

  const handleGenerateViews = (hashId: string) => {
    dispatch(generateViews({ datasetId: hashId }));
  };

  const handleGetViews = (hashId: string) => {
    dispatch(getViews(hashId));
  };

  const handleUpdateDataset = () => {
    dispatch(updateDatasets());
  };

  const handleOnChange = (name: string, value: any) => {
    dispatch(changeDataDetails({ name, value }));
  };

  function convertViewValuesToDataType(viewValues: ViewValues): DataType[][] {
    const convertedData: DataType[][] = [];

    Object.entries(viewValues).forEach(([key, values]) => {
      const keyData: DataType[] = [];

      values.forEach(([name, date]) => {
        keyData.push({ date, name });
      });

      convertedData.push(keyData);
    });

    return convertedData;

    // Little side note, you'll use the index of the data of the column to fetch the data you currently want to display
  }

  return {
    handleOnChange,
    handleUploadDataset,
    handleGenerateViews,
    datasetByIDActions,
    isLoading: uploadDatasetActions.isLoading || generateViewActions.isLoading,
    isPublished,
    dataDetails,
    publishedModalProps: { handleClose, isOpen, handleOpen },
    updateDatasetsActions,
    handleUpdateDataset,
    views,
    handleGetViews,
    disabled,
    isOwner,
  };
};
