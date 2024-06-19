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
  const { isOpen, handleOpen, handleClose } = useModal();
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
    isLoadingUpdateDataset,
    isLoading,
    isUpload,
    publishedModalProps: { handleClose, isOpen, handleOpen },
    isOwner,
  };
};
