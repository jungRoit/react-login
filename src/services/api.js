import axios from 'axios';

const axiosInstance = axios.create();

export const get = url => {
  return axiosInstance.get(url);
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};
