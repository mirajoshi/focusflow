import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHabitsRequest, createHabitRequest, deleteHabitRequest, checkInHabitRequest } from '../api/habitApi.js';

export function useHabits() {
  return useQuery({
    queryKey: ['habits'],
    queryFn: getHabitsRequest,
  });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHabitRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHabitRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}

export function useCheckInHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkInHabitRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}