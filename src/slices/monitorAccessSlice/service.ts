import axios from 'axios';

const getIncomingPermissions = async (user_id: string) => {
  const { data } = await axios.get(`/user/${user_id}/permissions/incoming`);
  return data;
};

const getOutgoingPermissions = async (user_id: string) => {
  const { data } = await axios.get(`/user/${user_id}/permissions/outgoing`);
  return data;
};

const monitorAccessService = {
  getIncomingPermissions,
  getOutgoingPermissions,
};

export default monitorAccessService;
