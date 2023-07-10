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

const getDatasets = async (view_as: string) => {
  const { data } = await axios.get(`/datasets?view_as=${view_as}`);
  return data;
};

const getPublishedDatasets = async (by: string) => {
  const { data } = await axios.get(`/datasets?by=${by}`);
  return data;
};

const getDatasetByID = async (id: string, view_as: string) => {
  const { data } = await axios.get(`/datasets/${id}?view_as=${view_as}`);
  return data;
};

const updateDatasetAvailability = async (
  dataset_id: string,
  available: boolean
) => {
  await axios.put(`/datasets/${dataset_id}/available/${available}`);
};

const updateDatasets = async (dataset: DatasetProps) => {
  const { data } = await axios.put('/datasets', dataset);
  return data;
};

const uploadDataset = async (dataset: any) => {
  const { data } = await axios.post('/datasets/upload/timeseries', dataset);
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
  const { data } = await axios.put(`/datasets/${dataset_id}/views`, request);
  return data;
};
const getViews = async (dataset_id: string) => {
  const { data } = await axios.get(`/datasets/${dataset_id}/views`);
  return data;
};
const dataService = {
  getDatasets,
  getPublishedDatasets,
  getDatasetByID,
  updateDatasetAvailability,
  updateDatasets,
  uploadDataset,
  generateViews,
  getViews,
};

export default dataService;
