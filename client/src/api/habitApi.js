import axiosInstance from './axiosInstance.js';

export const getHabitsRequest = async () => {
  const response = await axiosInstance.get('/habits');
  return response.data;
};

export const createHabitRequest = async (habitData) => {
  const response = await axiosInstance.post('/habits', habitData);
  return response.data;
};

export const deleteHabitRequest = async (id) => {
  const response = await axiosInstance.delete(`/habits/${id}`);
  return response.data;
};

export const checkInHabitRequest = async (id) => {
  const response = await axiosInstance.post(`/habits/${id}/checkin`);
  return response.data;
};