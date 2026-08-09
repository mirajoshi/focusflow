import { useQuery } from '@tanstack/react-query';
import { getStatsOverviewRequest } from '../api/statsApi.js';

export function useStatsOverview() {
  return useQuery({
    queryKey: ['stats-overview'],
    queryFn: getStatsOverviewRequest,
  });
}