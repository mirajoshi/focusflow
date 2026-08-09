import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTodosRequest,
  createTodoRequest,
  updateTodoRequest,
  deleteTodoRequest,
  toggleTodoCompleteRequest,
} from '../api/todoApi.js';

export function useTodos(filters = {}) {
  return useQuery({
    queryKey: ['todos', filters],
    queryFn: () => getTodosRequest(filters),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateTodoRequest(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useToggleTodoComplete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodoCompleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}