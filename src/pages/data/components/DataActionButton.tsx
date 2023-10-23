import {IDataset, PermissionStatus} from "@slices/dataSlice";
import CustomButton from "@components/ui/Button";
import useAuth from "@shared/hooks/useAuth";
import useDownloadDataset from "@pages/data/hooks/useDownloadDataset";

export function DataActionButton({dataset} : {dataset: IDataset}) {
  const { address, hasValidToken } = useAuth();
  const { handleDownload, isLoading : isDownloading } = useDownloadDataset();

  if (!dataset.available)
    return <CustomButton
        text="Unavailable"
        size="sm"
        icon="lock"
        btnStyle="outline-primary"
        disabled={true}
      />
  if (dataset.price == 0 || dataset.permission_status === PermissionStatus.GRANTED)
    return <CustomButton
        text="Download"
        btnStyle="outline-primary"
        size="sm"
        icon="download"
        isLoading={isDownloading}
        onClick={() => handleDownload(dataset)}
      />
  if (address === undefined || !hasValidToken)
    return <CustomButton
        text="Wallet required"
        size="sm"
        icon="lock"
        btnStyle="outline-primary"
        disabled={true}
      />
  if (dataset.available && dataset.price === '0' )
    return <CustomButton
        text="Request"
        size="sm"
        icon="lock"
        btnStyle="outline-primary"
      />
  else
    return <CustomButton
          text="Buy"
          size="sm"
          icon="buy"
          btnStyle="solid-secondary"
          onClick={() => handlePurchase(dataset)}
        />
}