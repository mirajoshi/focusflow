import axiosInstance from './axiosInstance.js';

export const updateProfileRequest = async (updates) => {
  const response = await axiosInstance.patch('/users/me', updates);
  return response.data;
};

export const updatePreferencesRequest = async (preferences) => {
  const response = await axiosInstance.patch('/users/me/preferences', preferences);
  return response.data;
};

export const deleteAccountRequest = async () => {
  const response = await axiosInstance.delete('/users/me');
  return response.data;
};