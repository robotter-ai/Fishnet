import axios from 'axios';

export type UploadDatasetProps = {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
};

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

const getDatasetByID = async (id: string) => {
  const { data } = await axios.get(`/datasets?id=${id}`);
  return data[0];
};

const updateDatasetAvailability = async (
  dataset_id: string,
  available: boolean
) => {
  await axios.put(`/datasets/${dataset_id}/available/${available}`);
};

const uploadDatasets = async (dataset: UploadDatasetProps) => {
  const { data } = await axios.put('/datasets', dataset);
  return data;
};

const dataService = {
  getDatasets,
  getPublishedDatasets,
  getDatasetByID,
  updateDatasetAvailability,
  uploadDatasets,
};

export default dataService;
