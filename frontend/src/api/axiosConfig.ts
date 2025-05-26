import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // importante para cookies
});

// 👇 Este interceptor debe ir en la instancia
axiosInstance.interceptors.request.use(config => {
  const xsrfToken = Cookies.get('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  return config;
});

export default axiosInstance;
