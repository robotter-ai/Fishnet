import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDownloadDatasetCSVQuery } from '@store/data/api';
import { IDataset } from '@store/data/types';

export default () => {
  const [datasetToDownload, setDatasetToDownload] = useState<IDataset | null>(
    null
  );
  const {
    data: csvBlob,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useDownloadDatasetCSVQuery(datasetToDownload?.item_hash || '', {
    skip: !datasetToDownload?.item_hash,
  });

  useEffect(() => {
    if (isSuccess && csvBlob) {
      const url = URL.createObjectURL(csvBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.style.display = 'none';
      if (!datasetToDownload) return;
      const datasetName = datasetToDownload.name;
      downloadLink.download = `${datasetName}.csv`;

      document.body.appendChild(downloadLink);
      downloadLink.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
      toast.success(`"${datasetName}" is ready to save`);
      setDatasetToDownload(null);
    } else if (isError && error) {
      console.error(error);
      toast.error(`Error downloading ${datasetToDownload}`);
    }
  }, [csvBlob, isError, isSuccess, error]);

  const handleDownload = (dataset: IDataset | undefined) => {
    setDatasetToDownload(dataset || null);
  };

  return { handleDownload, isLoading };
};
