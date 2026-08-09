import Habit from '../models/Habit.model.js';
import HabitLog from '../models/HabitLog.model.js';
import ApiError from '../utils/ApiError.js';

export const createHabit = async (userId, habitData) => {
  const habit = await Habit.create({ userId, ...habitData });
  return habit;
};

export const getHabits = async (userId) => {
  const habits = await Habit.find({ userId, isArchived: false }).sort({ createdAt: -1 });
  return habits;
};

export const getHabitById = async (userId, habitId) => {
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) {
    throw new ApiError(404, 'Habit not found');
  }
  return habit;
};

export const updateHabit = async (userId, habitId, updates) => {
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) {
    throw new ApiError(404, 'Habit not found');
  }
  Object.assign(habit, updates);
  await habit.save();
  return habit;
};

export const deleteHabit = async (userId, habitId) => {
  const habit = await Habit.findOneAndDelete({ _id: habitId, userId });
  if (!habit) {
    throw new ApiError(404, 'Habit not found');
  }
  // Clean up associated logs so we don't leave orphaned data behind
  await HabitLog.deleteMany({ habitId });
  return habit;
};

// Helper: format a Date object as 'YYYY-MM-DD' to match our stored log format
const formatDate = (date) => date.toISOString().split('T')[0];

export const checkInHabit = async (userId, habitId, date) => {
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) {
    throw new ApiError(404, 'Habit not found');
  }

  const logDate = date || formatDate(new Date());

  // findOneAndUpdate with upsert: create the log if it doesn't exist,
  // or update it if it does (e.g., toggling skipped -> completed)
  const log = await HabitLog.findOneAndUpdate(
    { habitId, date: logDate },
    { habitId, userId, date: logDate, status: 'completed' },
    { upsert: true, new: true }
  );

  await recalculateStreak(habit);

  return log;
};

export const getHabitLogs = async (userId, habitId, startDate, endDate) => {
  const query = { habitId, userId };
  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }
  const logs = await HabitLog.find(query).sort({ date: -1 });
  return logs;
};

// Recalculates currentStreak by walking backward from today through consecutive completed days
const recalculateStreak = async (habit) => {
  const logs = await HabitLog.find({ habitId: habit._id, status: 'completed' }).sort({ date: -1 });
  const completedDates = new Set(logs.map((log) => log.date));

  let streak = 0;
  let cursor = new Date();

  // Walk backward day by day from today, counting consecutive completed days
  while (completedDates.has(formatDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  habit.currentStreak = streak;
  if (streak > habit.longestStreak) {
    habit.longestStreak = streak;
  }
  await habit.save();
};