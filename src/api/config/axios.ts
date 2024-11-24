import axios from 'axios';
import { Endpoints } from './endpoints';

/**
 * The base URL for all HTTP requests.
 *
 * @const {string} baseURL - The base URL derived from the VITE_PUBLIC_URL
 * environment variable.
 */
const baseURL = import.meta.env.VITE_PUBLIC_URL;

/**
 * Custom Axios instance for making HTTP requests.
 *
 * This module creates an Axios instance with a base URL sourced from
 * environment variables. It also configures a response interceptor
 * to handle errors uniformly across the application.
 *
 * @module http
 * @see {@link https://axios-http.com/} for more details on Axios usage.
 */
const http = axios.create({
  baseURL,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const error: string = (err as any)?.message?.toString() || 'Error';
    return Promise.reject(error);
  }
);

http.interceptors.request.use((config) => {
  if (import.meta.env.VITE_USE_MOCK === 'true' && config.url === Endpoints.temperatures) {
    return {
      ...config,
      adapter: async () => {
        return {
          data: { data: config.data },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      },
    };
  }
  return config;
});

/**
 * The configured Axios instance.
 *
 * @constant {AxiosInstance} http - The instance for making HTTP requests.
 */
export default http;
