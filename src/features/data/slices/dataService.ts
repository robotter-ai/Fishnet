import axios from 'axios';

const getDatasets = async (address: string) => {
  const res = await axios.get(`/user/${address}/datasets`);

  return res;
};

const dataService = {
  getDatasets,
};

export default dataService;
