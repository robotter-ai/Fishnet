import axios from 'axios';

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

const monitorAccessService = {
  getIncomingPermissions,
  getOutgoingPermissions,
  getDatasetPermissions,
};

export default monitorAccessService;
