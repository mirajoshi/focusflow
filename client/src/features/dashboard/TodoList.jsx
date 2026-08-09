import { useState } from 'react';
import { useTodos, useCreateTodo, useToggleTodoComplete, useDeleteTodo } from '../../hooks/useTodos.js';

function TodoList() {
  const [title, setTitle] = useState('');
  const { data, isLoading, error } = useTodos();
  const createTodo = useCreateTodo();
  const toggleComplete = useToggleTodoComplete();
  const deleteTodo = useDeleteTodo();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTodo.mutate({ title });
    setTitle('');
  };

  if (isLoading) return <p className="text-muted">Loading todos...</p>;
  if (error) return <p className="text-red-400">Failed to load todos.</p>;

  const todos = data?.data || [];

  return (
    <div className="max-w-lg">
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 rounded bg-surface border border-border text-paper focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={createTodo.isPending}
          className="px-4 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="text-muted">No todos yet. Add one above.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center gap-3 px-3 py-2 rounded bg-surface border border-border"
            >
              <input
                type="checkbox"
                checked={todo.status === 'completed'}
                onChange={() => toggleComplete.mutate(todo._id)}
                className="accent-accent"
              />
              <span
                className={`flex-1 ${
                  todo.status === 'completed' ? 'line-through text-muted' : 'text-paper'
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo.mutate(todo._id)}
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

export default TodoList;