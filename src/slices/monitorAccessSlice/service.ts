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
  const { data } = await axios.get(`/users/${user_id}/permissions/incoming`);
  return data;
};

const getOutgoingPermissions = async (user_id: string) => {
  const { data } = await axios.get(`/users/${user_id}/permissions/outgoing`);
  return data;
};

const getDatasetPermissions = async (dataset_id: string) => {
  const { data } = await axios.get(`/datasets/${dataset_id}/permissions`);
  return data;
};

const requestDatasetPermissions = async (
  dataset_id: string,
  inputs: DatasetPermisionProps
) => {
  const { data } = await axios.put(
    `/permissions/datasets/${dataset_id}/request`,
    inputs
  );
  return data;
};

const grantDatasetPermissions = async (
  dataset_id: string,
  inputs: DatasetPermisionProps
) => {
  const { data } = await axios.put(
    `/permissions/datasets/${dataset_id}/grant`,
    inputs
  );
  return data;
};

const denyPermissions = async (item_hashes: string[]) => {
  const { data } = await axios.put(`/permissions/deny`, item_hashes);
  return data;
};

const approvePermissions = async (item_hashes: string[]) => {
  const { data } = await axios.put(`/permissions/approve`, item_hashes);
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
