import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
} from '../services/todo.service.js';

export const createTodoHandler = asyncHandler(async (req, res) => {
  const todo = await createTodo(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, todo, 'Todo created successfully'));
});

export const getTodosHandler = asyncHandler(async (req, res) => {
  const { status, priority } = req.query;
  const todos = await getTodos(req.user._id, { status, priority });
  res.status(200).json(new ApiResponse(200, todos, 'Todos retrieved successfully'));
});

export const getTodoByIdHandler = asyncHandler(async (req, res) => {
  const todo = await getTodoById(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, todo, 'Todo retrieved successfully'));
});

export const updateTodoHandler = asyncHandler(async (req, res) => {
  const todo = await updateTodo(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, todo, 'Todo updated successfully'));
});

export const deleteTodoHandler = asyncHandler(async (req, res) => {
  await deleteTodo(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, {}, 'Todo deleted successfully'));
});

export const toggleTodoCompleteHandler = asyncHandler(async (req, res) => {
  const todo = await toggleTodoComplete(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, todo, 'Todo status toggled successfully'));
});