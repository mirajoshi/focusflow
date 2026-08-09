import axiosInstance from './axiosInstance.js';

export const getEventsRequest = async ({ month, year }) => {
  const response = await axiosInstance.get('/planner/events', { params: { month, year } });
  return response.data;
};

export const createEventRequest = async (eventData) => {
  const response = await axiosInstance.post('/planner/events', eventData);
  return response.data;
};

export const deleteEventRequest = async (id) => {
  const response = await axiosInstance.delete(`/planner/events/${id}`);
  return response.data;
};