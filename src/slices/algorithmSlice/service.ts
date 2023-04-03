import axios from 'axios';

export type UploadAlgorithmProps = {
  id_hash?: string;
  name: string;
  desc: string;
  owner: string;
  code?: string;
};

const getAlgorithms = async () => {
  const { data } = await axios.get(`/algorithms`);
  return data;
};

const getPublishedAlgorithms = async (by: string) => {
  const { data } = await axios.get(`/algorithms?by=${by}`);
  return data;
};

const getAlgorithmByID = async (id: string) => {
  const { data } = await axios.get(`/algorithms/${id}`);
  return data;
};

const getExecutions = async () => {
  const { data } = await axios.get('/executions');
  return data;
};

const getExecutionResultByID = async (id: string) => {
  const { data } = await axios.get(`/results/${id}`);
  return data;
};

const uploadgetAlgorithm = async (inputs: UploadAlgorithmProps) => {
  const { data } = await axios.put('/algorithms/upload', inputs);
  return data;
};

const algorithmService = {
  getAlgorithms,
  getPublishedAlgorithms,
  getAlgorithmByID,
  getExecutions,
  getExecutionResultByID,
  uploadgetAlgorithm,
};

export default algorithmService;
