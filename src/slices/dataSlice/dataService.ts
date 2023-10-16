import { FISHNET_API_URL, getConfig } from '@slices/requestConfig';
import axios from 'axios';

export type DatasetProps = {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
};

export interface ViewValues {
  [key: string]: [string, string][];
}
export interface DataType {
  name: string;
  date: string;
}
export type GetDatasetProps = {
  id?: string;
  view_as?: string;
  by?: string;
  page?: number;
  page_size?: number;
};

const getPublishedDatasets = async (by: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/datasets?by=${by}`,
    getConfig()
  );
  return data;
};

const updateDatasetAvailability = async (
  dataset_id: string,
  available: boolean
) => {
  await axios.put(
    `${FISHNET_API_URL}/datasets/${dataset_id}/available/${available}`,
    undefined,
    getConfig()
  );
};

const updateDatasets = async (dataset: DatasetProps) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/datasets`,
    dataset,
    getConfig()
  );
  return data;
};

const uploadDataset = async (dataset: any) => {
  const { data } = await axios.post(
    `${FISHNET_API_URL}/datasets/upload/timeseries`,
    dataset,
    getConfig()
  );
  return data;
};

const generateViews = async (
  dataset_id: string,
  request: {
    timeseriesIDs: string[];
    granularity: string;
    startTime: number;
    endTime: number;
  }[]
) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/datasets/${dataset_id}/views`,
    request,
    getConfig()
  );
  return data;
};
const getViews = async (dataset_id: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/datasets/${dataset_id}/views`,
    getConfig()
  );
  return data;
};
const dataService = {
  getPublishedDatasets,
  updateDatasetAvailability,
  updateDatasets,
  uploadDataset,
  generateViews,
  getViews,
};

export default dataService;
