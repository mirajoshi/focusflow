import Todo from '../models/Todo.model.js';
import ApiError from '../utils/ApiError.js';

export const createTodo = async (userId, todoData) => {
  const todo = await Todo.create({
    userId,
    ...todoData,
  });
  return todo;
};

export const getTodos = async (userId, filters = {}) => {
  const query = { userId };

  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;

  const todos = await Todo.find(query).sort({ createdAt: -1 });
  return todos;
};

export const getTodoById = async (userId, todoId) => {
  const todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }
  return todo;
};

export const updateTodo = async (userId, todoId, updates) => {
  const todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }

  Object.assign(todo, updates);
  await todo.save();
  return todo;
};

export const deleteTodo = async (userId, todoId) => {
  const todo = await Todo.findOneAndDelete({ _id: todoId, userId });
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }
  return todo;
};

export const toggleTodoComplete = async (userId, todoId) => {
  const todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }

  if (todo.status === 'completed') {
    todo.status = 'pending';
    todo.completedAt = null;
  } else {
    todo.status = 'completed';
    todo.completedAt = new Date();
  }

  await todo.save();
  return todo;
};