import PomodoroSession from '../models/PomodoroSession.model.js';
import ApiError from '../utils/ApiError.js';

export const startSession = async (userId, { type, plannedDuration, linkedTodoId }) => {
  const session = await PomodoroSession.create({
    userId,
    type: type || 'focus',
    plannedDuration,
    linkedTodoId: linkedTodoId || null,
    startedAt: new Date(),
  });
  return session;
};

export const endSession = async (userId, sessionId, { completed }) => {
  const session = await PomodoroSession.findOne({ _id: sessionId, userId });
  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  const endedAt = new Date();
  const actualDurationMs = endedAt - session.startedAt;
  const actualDuration = Math.round(actualDurationMs / 1000 / 60); // convert to minutes

  session.endedAt = endedAt;
  session.actualDuration = actualDuration;
  session.completed = !!completed;
  await session.save();

  return session;
};

export const getSessionHistory = async (userId, limit = 20) => {
  const sessions = await PomodoroSession.find({ userId })
    .sort({ startedAt: -1 })
    .limit(limit);
  return sessions;
};

export const getTodaySummary = async (userId) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const sessions = await PomodoroSession.find({
    userId,
    startedAt: { $gte: startOfToday },
    type: 'focus',
    completed: true,
  });

  const totalFocusMinutes = sessions.reduce((sum, s) => sum + (s.actualDuration || 0), 0);
  const completedSessions = sessions.length;

  return { totalFocusMinutes, completedSessions };
};