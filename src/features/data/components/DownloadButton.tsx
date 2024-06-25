import { Component } from 'react';
import Button from '@components/ui/Button';
import { IDataset } from '@store/data/types';
import useDownloadDataset from '../hooks/useDownloadDataset';

export class DownloadButton extends Component<{ dataset: IDataset }> {
  render() {
    const { handleDownload, isLoading } = useDownloadDataset();
    return (
      <Button
        text="Download"
        size="md"
        icon="download"
        btnStyle="outline-primary"
        isLoading={isLoading}
        onClick={() => handleDownload(this.props.dataset)}
      />
    );
  }
}
