/**
 * one Axios instance used for all the requests to the server
 * the request interceptor adds the header  Authorization: Bearer <token>  automatically
 * the response interceptor logs the user out when the server says the token is not valid anymore
 */

import axios from 'axios';

export const TOKEN_KEY = 'alzikrayat_token';
export const USER_KEY = 'alzikrayat_user';

const api = axios.create({ baseURL: '/api' });

// before every request: if there is a token, put it in the header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// after every response: if the server returns 401 while we have a token, then the token is expired or invalid
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// get the first error message that the server sent, or a default message
export const getErrorMessage = (err, fallback = 'Something went wrong') =>
  err.response?.data?.errors?.[0] || err.response?.data?.message || fallback;

export default api;
