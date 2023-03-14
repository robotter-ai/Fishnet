import axios from 'axios';

export type UploadDatasetProps = {
  id_hash?: string;
  name: string;
  desc: string;
  owner: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
};

const getDatasets = async (address: string) => {
  const { data } = await axios.get(`/datasets`);
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
  const { data } = await axios.put('/datasets/upload', dataset);
  return data;
};

const dataService = {
  getDatasets,
  getDatasetByID,
  updateDatasetAvailability,
  uploadDatasets,
};

export default dataService;
