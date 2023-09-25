import { FISHNET_API_URL, getConfig } from '@slices/requestConfig';
import axios from 'axios';

export type UploadAlgorithmProps = {
  item_hash?: string;
  name: string;
  desc: string;
  owner: string;
  code?: string;
};

const getAlgorithms = async () => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/algorithms`,
    getConfig()
  );
  return data;
};

const getPublishedAlgorithms = async (by: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/algorithms?by=${by}`,
    getConfig()
  );
  return data;
};

const getAlgorithmByID = async (id: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/algorithms/${id}`,
    getConfig()
  );
  return data;
};

const getExecutions = async () => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/executions`,
    getConfig()
  );
  return data;
};

const getExecutionResultByID = async (id: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/results/${id}`,
    getConfig()
  );
  return data;
};

const uploadgetAlgorithm = async (inputs: UploadAlgorithmProps) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/algorithms`,
    inputs,
    getConfig()
  );
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
