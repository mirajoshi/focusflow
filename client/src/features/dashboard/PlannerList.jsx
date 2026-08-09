import { useState } from 'react';
import { useEvents, useCreateEvent, useDeleteEvent } from '../../hooks/usePlanner.js';

function PlannerList() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const now = new Date();
  const month = now.getMonth() + 1; // JS months are 0-indexed; our API expects 1-12
  const year = now.getFullYear();

  const { data, isLoading, error } = useEvents(month, year);
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    createEvent.mutate({ title, date });
    setTitle('');
    setDate('');
  };

  if (isLoading) return <p className="text-muted">Loading events...</p>;
  if (error) return <p className="text-red-400">Failed to load events.</p>;

  const events = data?.data || [];

  return (
    <div className="max-w-lg p-6 rounded bg-surface border border-border">
      <h2 className="font-display text-2xl text-paper mb-4">This Month</h2>

      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title..."
          className="px-3 py-2 rounded bg-ink border border-border text-paper focus:outline-none focus:border-accent"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-ink border border-border text-paper focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={createEvent.isPending}
            className="px-4 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </form>

      {events.length === 0 ? (
        <p className="text-muted">No events this month.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event) => (
            <li
              key={event._id}
              className="flex items-center gap-3 px-3 py-2 rounded bg-ink border border-border"
            >
              <span className="text-sm text-sage w-24">{event.date}</span>
              <span className="flex-1 text-paper">{event.title}</span>
              <button
                onClick={() => deleteEvent.mutate(event._id)}
                className="text-sm text-muted hover:text-red-400"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlannerList;