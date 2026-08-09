import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventsRequest, createEventRequest, deleteEventRequest } from '../api/plannerApi.js';

export function useEvents(month, year) {
  return useQuery({
    queryKey: ['events', month, year],
    queryFn: () => getEventsRequest({ month, year }),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEventRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEventRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}