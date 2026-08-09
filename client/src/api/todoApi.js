import axiosInstance from './axiosInstance.js';

export const getTodosRequest = async (filters = {}) => {
  const response = await axiosInstance.get('/todos', { params: filters });
  return response.data;
};

export const createTodoRequest = async (todoData) => {
  const response = await axiosInstance.post('/todos', todoData);
  return response.data;
};

export const updateTodoRequest = async (id, updates) => {
  const response = await axiosInstance.patch(`/todos/${id}`, updates);
  return response.data;
};

export const deleteTodoRequest = async (id) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};

export const toggleTodoCompleteRequest = async (id) => {
  const response = await axiosInstance.patch(`/todos/${id}/complete`);
  return response.data;
};