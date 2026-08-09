import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  checkInHabit,
  getHabitLogs,
} from '../services/habit.service.js';

export const createHabitHandler = asyncHandler(async (req, res) => {
  const habit = await createHabit(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, habit, 'Habit created successfully'));
});

export const getHabitsHandler = asyncHandler(async (req, res) => {
  const habits = await getHabits(req.user._id);
  res.status(200).json(new ApiResponse(200, habits, 'Habits retrieved successfully'));
});

export const getHabitByIdHandler = asyncHandler(async (req, res) => {
  const habit = await getHabitById(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, habit, 'Habit retrieved successfully'));
});

export const updateHabitHandler = asyncHandler(async (req, res) => {
  const habit = await updateHabit(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, habit, 'Habit updated successfully'));
});

export const deleteHabitHandler = asyncHandler(async (req, res) => {
  await deleteHabit(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, {}, 'Habit deleted successfully'));
});

export const checkInHabitHandler = asyncHandler(async (req, res) => {
  const { date } = req.body || {};
  const log = await checkInHabit(req.user._id, req.params.id, date);
  res.status(200).json(new ApiResponse(200, log, 'Habit checked in successfully'));
});

export const getHabitLogsHandler = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const logs = await getHabitLogs(req.user._id, req.params.id, startDate, endDate);
  res.status(200).json(new ApiResponse(200, logs, 'Habit logs retrieved successfully'));
});