import axios from 'axios';

export type UploadDatasetProps = {
  id_hash: string;
  dataName: string;
  desc: string;
  owner: string;
  ownsAllTimeseries: boolean;
  timeseriesIDs: string[];
};

const getDatasets = async (address: string) => {
  const { data } = await axios.get(`/datasets`);
  return data;
};

const updateDatasetAvailability = async (
  dataset_id: string,
  available: boolean
) => {
  await axios.put(`/datasets/${dataset_id}/available/${available}`);
};

const uploadDatasets = async (dataset: UploadDatasetProps) => {
  await axios.put('/datasets/upload', dataset);
};

const dataService = {
  getDatasets,
  updateDatasetAvailability,
  uploadDatasets,
};

export default dataService;
