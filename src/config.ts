import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

window.addEventListener('offline', () => {});
window.addEventListener('online', () => {});
