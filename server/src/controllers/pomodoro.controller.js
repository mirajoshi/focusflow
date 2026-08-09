import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { startSession, endSession, getSessionHistory, getTodaySummary } from '../services/pomodoro.service.js';

export const startSessionHandler = asyncHandler(async (req, res) => {
  const session = await startSession(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, session, 'Session started'));
});

export const endSessionHandler = asyncHandler(async (req, res) => {
  const session = await endSession(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, session, 'Session ended'));
});

export const getSessionHistoryHandler = asyncHandler(async (req, res) => {
  const sessions = await getSessionHistory(req.user._id);
  res.status(200).json(new ApiResponse(200, sessions, 'Session history retrieved'));
});

export const getTodaySummaryHandler = asyncHandler(async (req, res) => {
  const summary = await getTodaySummary(req.user._id);
  res.status(200).json(new ApiResponse(200, summary, 'Today summary retrieved'));
});