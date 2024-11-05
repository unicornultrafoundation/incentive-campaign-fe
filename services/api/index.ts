import axios from 'axios';

import { BASE_REQUEST_OPTIONS } from '@/config/api';
import { BACKEND_URL } from '@/config/env';
import { setAuthCredential } from '@/store/auth';

/** Client-side API **/
export const nextAPI = axios.create({
  baseURL: '/api',
  ...BASE_REQUEST_OPTIONS,
});
nextAPI.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  },
);
nextAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      setAuthCredential(false);
    }
    return Promise.reject(error.response?.data);
  },
);

/** Server-side API **/
export const backendAPI = axios.create({
  baseURL: BACKEND_URL,
  ...BASE_REQUEST_OPTIONS,
});
backendAPI.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// API response interceptor
backendAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response.data);
  },
);

export const getBackendAPI = () => {
  const backendAPI = axios.create({
    baseURL: BACKEND_URL,
    ...BASE_REQUEST_OPTIONS,
  });
  backendAPI.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  // API response interceptor
  backendAPI.interceptors.response.use(
    (response) => response.data,
    (error) => {
      return Promise.reject(error.response);
    },
  );

  return backendAPI;
};
