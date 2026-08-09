import { useStatsOverview } from '../../hooks/useStats.js';

function StatsOverview() {
  const { data, isLoading, error } = useStatsOverview();

  if (isLoading) return <p className="text-muted">Loading stats...</p>;
  if (error) return <p className="text-red-400">Failed to load stats.</p>;

  const stats = data?.data;
  if (!stats) return null;

  const items = [
    { label: 'Todos completed', value: `${stats.completedTodos} / ${stats.totalTodos}` },
    { label: 'Completion rate', value: `${stats.todoCompletionRate}%` },
    { label: 'Active habits', value: stats.activeHabits },
    { label: 'Longest streak', value: `🔥 ${stats.longestCurrentStreak}` },
    { label: 'Focus sessions (7d)', value: stats.focusSessionsThisWeek },
    { label: 'Focus minutes (7d)', value: stats.totalFocusMinutesThisWeek },
  ];

  return (
    <div className="max-w-lg p-6 rounded bg-surface border border-border">
      <h2 className="font-display text-2xl text-paper mb-4">Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label} className="px-3 py-2 rounded bg-ink border border-border">
            <p className="text-xs text-muted mb-1">{item.label}</p>
            <p className="text-xl text-paper font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsOverview;