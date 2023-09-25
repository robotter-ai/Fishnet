import { FISHNET_API_URL, getConfig } from '@slices/requestConfig';
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
  const { data } = await axios.get(
    `${FISHNET_API_URL}/users/${user_id}/permissions/incoming`,
    getConfig()
  );
  return data;
};

const getOutgoingPermissions = async (user_id: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/users/${user_id}/permissions/outgoing`,
    getConfig()
  );
  return data;
};

const getDatasetPermissions = async (dataset_id: string) => {
  const { data } = await axios.get(
    `${FISHNET_API_URL}/datasets/${dataset_id}/permissions`,
    getConfig()
  );
  return data;
};

const requestDatasetPermissions = async (
  dataset_id: string,
  inputs: DatasetPermisionProps
) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/permissions/datasets/${dataset_id}/request`,
    undefined,
    getConfig()
  );
  return data;
};

const grantDatasetPermissions = async (
  dataset_id: string,
  inputs: DatasetPermisionProps
) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/permissions/datasets/${dataset_id}/grant`,
    inputs,
    getConfig()
  );
  return data;
};

const denyPermissions = async (item_hashes: string[]) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/permissions/deny`,
    item_hashes,
    getConfig()
  );
  return data;
};

const approvePermissions = async (item_hashes: string[]) => {
  const { data } = await axios.put(
    `${FISHNET_API_URL}/permissions/approve`,
    item_hashes,
    getConfig()
  );
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
