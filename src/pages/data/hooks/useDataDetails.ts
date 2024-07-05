import { useEffect, useState } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import { useParams } from 'react-router-dom';
import { useAuth } from '@contexts/auth-provider';
import useOwner from '@shared/hooks/useOwner';
import {
  useGenerateViewsMutation,
  useGetDatasetByIdQuery,
  useUpdateDatasetMutation,
  useUploadDatasetMutation,
} from '@store/data/api';
import { IDataset } from '@store/data/types';

export default () => {
  const { id } = useParams();
  const { setTitle, getTitle } = usePageTitle();
  const auth = useAuth();
  const [dataset, setDataset] = useState<Record<string, any>>({
    name: '',
    price: '',
    desc: '',
  });
  const { timeseries, charts } = useAppSelector((state) => state.data);
  const { isOpen, handleOpen, handleClose } = useModal();
  const { isOwner } = useOwner(dataset?.owner);

  const isUpload = (id && id === 'upload') as boolean;

  const {
    data,
    isLoading: isLoadingGetDataset,
    isSuccess: isGetDatasetSuccess,
  } = useGetDatasetByIdQuery(
    { datasetID: id as string, view_as: auth.address },
    { skip: isUpload }
  );
  const [uploadDataset, { isLoading: isLoadingUploadDataset }] =
    useUploadDatasetMutation();
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
        price: '',
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

    uploadDataset({
      dataset: inputsToUpload,
      timeseries: timeseries.map((item: any) => ({
        name: item.name,
        owner: item.owner,
        desc: item.desc,
        data: item.data,
      })),
    })
      .unwrap()
      .then((res: any) => {
        setDataset(res?.dataset);
        handleGenerateViews(res);
      });
  };

  const handleUpdateDataset = () => {
    updateDataset(inputsToUpload).then(() => {
      handleOpen();
    });
  };

  const handleGenerateViews = (res: any) => {
    const views: any[] = [];

    for (let i = 0; i < charts.length; i++) {
      const chart = charts[i]; // Get a single chart item
      const columns = chart.keys.map((item) => item.name); // Chart columns

      const timeseriesIDs: string[] = [];
      let startTime;
      let endTime;

      // For loop for the chart columns to get the timeseries ID
      for (let k = 0; k < columns.length; k++) {
        const coulumn = columns[k];
        const timesery = res?.timeseries?.find(
          (item: any) => item.name === coulumn
        );
        endTime = timesery.latest;
        startTime = timesery.earliest;
        timeseriesIDs.push(timesery.item_hash);
      }

      views.push({
        timeseriesIDs,
        granularity: chart.interval,
        startTime,
        endTime,
      });
    }

    generateViews({
      datasetID: res?.dataset?.item_hash,
      data: views,
    })
      .unwrap()
      .then(() => {
        handleOpen();
      });
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

  return {
    dataset,
    handleOnChange,
    handleUploadDataset,
    handleUpdateDataset,
    isLoadingGetDataset,
    isLoadingUploadDataset: isLoadingUploadDataset || isLoadingGenerateViews,
    isLoadingUpdateDataset,
    isUpload,
    publishedModalProps: { handleClose, isOpen, handleOpen },
    isOwner,
  };
};
