export interface IGetDataset {
  type: 'browse-data' | 'published';
  address: string;
}

export interface IGenerateViews {
  datasetID: string;
  data: any;
}

export interface IDataset {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  price: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
  downloads?: number | string;
}

export interface IUpdateDatasetAvailability {
  datasetID: string;
  available: boolean;
}

export type IDatasetTimeseries = { dataset: IDataset; timeseries: any[] };

export interface IChartProps {
  id: string;
  interval: string;
  keys: {
    name: string;
    color: string;
  }[];
  data: Record<string, any>[];
}
