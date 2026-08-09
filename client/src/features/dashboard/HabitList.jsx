import { useState } from 'react';
import { useHabits, useCreateHabit, useCheckInHabit, useDeleteHabit } from '../../hooks/useHabits.js';

function HabitList() {
  const [name, setName] = useState('');
  const [checkedInToday, setCheckedInToday] = useState(new Set());
  const { data, isLoading, error } = useHabits();
  const createHabit = useCreateHabit();
  const checkIn = useCheckInHabit();
  const deleteHabit = useDeleteHabit();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createHabit.mutate({ name });
    setName('');
  };

  const handleCheckIn = (habitId) => {
    checkIn.mutate(habitId, {
      onSuccess: () => {
        setCheckedInToday((prev) => new Set(prev).add(habitId));
      },
    });
  };

  if (isLoading) return <p className="text-muted">Loading habits...</p>;
  if (error) return <p className="text-red-400">Failed to load habits.</p>;

  const habits = data?.data || [];

  return (
    <div className="max-w-lg p-6 rounded bg-surface border border-border">
      <h2 className="font-display text-2xl text-paper mb-4">Habits</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a new habit..."
          className="flex-1 px-3 py-2 rounded bg-ink border border-border text-paper focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={createHabit.isPending}
          className="px-4 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="text-muted">No habits yet. Add one above.</p>
      ) : (
        <ul className="space-y-2">
          {habits.map((habit) => {
            const isCheckedIn = checkedInToday.has(habit._id);
            return (
              <li
                key={habit._id}
                className="flex items-center gap-3 px-3 py-2 rounded bg-ink border border-border"
              >
                <span className="text-xl">{habit.icon}</span>
                <span className="flex-1 text-paper">{habit.name}</span>
                <span className="text-sm text-sage">
                  🔥 {habit.currentStreak}
                </span>
                <button
                  onClick={() => handleCheckIn(habit._id)}
                  disabled={checkIn.isPending || isCheckedIn}
                  className={`text-sm ${
                    isCheckedIn
                      ? 'text-sage cursor-default'
                      : 'text-accent hover:text-accent-hover'
                  } disabled:opacity-70`}
                >
                  {isCheckedIn ? '✓ Checked in' : 'Check in'}
                </button>
                <button
                  onClick={() => deleteHabit.mutate(habit._id)}
                  className="text-sm text-muted hover:text-red-400"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default HabitList;