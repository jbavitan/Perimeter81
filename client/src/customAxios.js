import axios from 'axios';

const customAxios = (token) => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    config.headers['x-access-token'] = token;
    return config;
  });

  return axiosInstance;
};

export default customAxios;