import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getHeaders = (auth = true, form = false) => {
  const headers: Record<string, string> = {
    'Content-Type': form ? 'multipart/form-data' : 'application/json',
  };

  if (auth) {
    const bearerToken = cookies.get('bearerToken');
    if (bearerToken) {
      headers.Authorization = `Bearer ${bearerToken}`;
    }
  }
  console.log("Headers being sent:", headers);

  return headers;
};

export const FISHNET_API_URL = import.meta.env.VITE_FISHNET_API_URL;
export const TRANSACTIONS_API_URL = import.meta.env.VITE_TRANSACTIONS_API_URL;