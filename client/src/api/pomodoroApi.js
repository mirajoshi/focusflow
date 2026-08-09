import axiosInstance from './axiosInstance.js';

export const startSessionRequest = async (sessionData) => {
  const response = await axiosInstance.post('/pomodoro/sessions', sessionData);
  return response.data;
};

export const endSessionRequest = async (id, completed) => {
  const response = await axiosInstance.patch(`/pomodoro/sessions/${id}/end`, { completed });
  return response.data;
};

export const getTodaySummaryRequest = async () => {
  const response = await axiosInstance.get('/pomodoro/sessions/today-summary');
  return response.data;
};