import { config } from '@slices/requestConfig';
import axios from 'axios';

export interface DatasetPermisionProps {
  requestor?: string;
  algorithmID?: string;
  timeseriesIDs?: string[];
  requestedExecutionCount?: number;
  maxExecutionCount?: number;
  authorizer?: string;
}

const getIncomingPermissions = async (user_id: string) => {
  const { data } = await axios.get(`/users/${user_id}/permissions/incoming`, config);
  return data;
};

const getOutgoingPermissions = async (user_id: string) => {
  const { data } = await axios.get(`/users/${user_id}/permissions/outgoing`, config);
  return data;
};

const getDatasetPermissions = async (dataset_id: string) => {
  const { data } = await axios.get(`/datasets/${dataset_id}/permissions`, config);
  return data;
};

const requestDatasetPermissions = async (
  dataset_id: string,
  inputs: DatasetPermisionProps
) => {
  const { data } = await axios.put(
    `/permissions/datasets/${dataset_id}/request`,
    inputs,
    config
  );
  return data;
};

const grantDatasetPermissions = async (
  dataset_id: string,
  inputs: DatasetPermisionProps
) => {
  const { data } = await axios.put(
    `/permissions/datasets/${dataset_id}/grant`,
    inputs,
    config
  );
  return data;
};

const denyPermissions = async (item_hashes: string[]) => {
  const { data } = await axios.put(`/permissions/deny`, item_hashes, config);
  return data;
};

const approvePermissions = async (item_hashes: string[]) => {
  const { data } = await axios.put(`/permissions/approve`, item_hashes, config);
  return data;
};

const monitorAccessService = {
  getIncomingPermissions,
  getOutgoingPermissions,
  getDatasetPermissions,
  requestDatasetPermissions,
  denyPermissions,
  approvePermissions,
  grantDatasetPermissions,
};

export default monitorAccessService;
