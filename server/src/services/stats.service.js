import Todo from '../models/Todo.model.js';
import Habit from '../models/Habit.model.js';
import PomodoroSession from '../models/PomodoroSession.model.js';

export const getStatsOverview = async (userId) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalTodos,
    completedTodos,
    activeHabits,
    focusSessionsThisWeek,
  ] = await Promise.all([
    Todo.countDocuments({ userId }),
    Todo.countDocuments({ userId, status: 'completed' }),
    Habit.countDocuments({ userId, isArchived: false }),
    PomodoroSession.find({
      userId,
      type: 'focus',
      completed: true,
      startedAt: { $gte: sevenDaysAgo },
    }),
  ]);

  const totalFocusMinutesThisWeek = focusSessionsThisWeek.reduce(
    (sum, s) => sum + (s.actualDuration || 0),
    0
  );

  const habits = await Habit.find({ userId, isArchived: false });
  const longestCurrentStreak = habits.reduce(
    (max, h) => Math.max(max, h.currentStreak),
    0
  );

  return {
    totalTodos,
    completedTodos,
    todoCompletionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
    activeHabits,
    longestCurrentStreak,
    focusSessionsThisWeek: focusSessionsThisWeek.length,
    totalFocusMinutesThisWeek,
  };
};