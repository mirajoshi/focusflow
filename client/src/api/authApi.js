import axiosInstance from './axiosInstance.js';

export const registerRequest = async ({ name, email, password }) => {
  const response = await axiosInstance.post('/auth/register', { name, email, password });
  return response.data;
};

export const loginRequest = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

export const logoutRequest = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  return response.data;
};

export const getMeRequest = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};