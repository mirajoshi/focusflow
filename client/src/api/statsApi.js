import axiosInstance from './axiosInstance.js';

export const getStatsOverviewRequest = async () => {
  const response = await axiosInstance.get('/stats/overview');
  return response.data;
};