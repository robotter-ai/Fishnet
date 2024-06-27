import {Component} from "react";
import Button from "@components/ui/Button";
import useDownloadDataset from "@pages/data/hooks/useDownloadDataset";
import { IDataset } from "@store/data/types";

export class DownloadButton extends Component<{dataset: IDataset}> {
  render() {
  const { handleDownload, isLoading } = useDownloadDataset();
    return <Button
      text="Download"
      size="md"
      icon="download"
      btnStyle="outline-primary"
      isLoading={isLoading}
      onClick={() => handleDownload(this.props.dataset)}
    />;
  }
}