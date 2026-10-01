import axios, { type CreateAxiosDefaults, isAxiosError } from "axios";

import { getCookie } from "@/utils/cookie-util";

import { HttpStatus } from "./constant-config";
import env from "./env-config";
import { progressBar } from "./nprogress-config";

const httpConfig: CreateAxiosDefaults = {
  baseURL: env.baseUrl,
  timeout: 50000,
};

const readClient = axios.create(httpConfig);
readClient.interceptors.request.use(
  (internalAxiosRequestConfig) => {
    const token = getCookie("token");
    if (token) {
      internalAxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
    }
    progressBar.start();
    return internalAxiosRequestConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

readClient.interceptors.response.use(
  (axiosResponse) => {
    progressBar.done();
    return axiosResponse;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        window.dispatchEvent(new Event("session-expired"));
      }
    }
    progressBar.done();
    return Promise.reject(error);
  },
);

const writeClient = axios.create(httpConfig);

writeClient.interceptors.request.use(
  (internalAxiosRequestConfig) => {
    progressBar.start();
    const token = getCookie("token");
    if (token) {
      internalAxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return internalAxiosRequestConfig;
  },
  (error) => Promise.reject(error),
);

writeClient.interceptors.response.use(
  (axiosResponse) => {
    progressBar.done();
    return axiosResponse;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        window.dispatchEvent(new Event("session-expired"));
      }
    }
    progressBar.done();
    return Promise.reject(error);
  },
);

export { readClient, writeClient };
