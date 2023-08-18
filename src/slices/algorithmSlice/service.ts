import { config } from '@slices/requestConfig';
import axios from 'axios';

export type UploadAlgorithmProps = {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  code?: string;
};

const getAlgorithms = async () => {
  const { data } = await axios.get(`/algorithms`, config);
  return data;
};

const getPublishedAlgorithms = async (by: string) => {
  const { data } = await axios.get(`/algorithms?by=${by}`, config);
  return data;
};

const getAlgorithmByID = async (id: string) => {
  const { data } = await axios.get(`/algorithms/${id}`, config);
  return data;
};

const getExecutions = async () => {
  const { data } = await axios.get('/executions', config);
  return data;
};

const getExecutionResultByID = async (id: string) => {
  const { data } = await axios.get(`/results/${id}`, config);
  return data;
};

const uploadgetAlgorithm = async (inputs: UploadAlgorithmProps) => {
  const { data } = await axios.put('/algorithms', inputs, config);
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
