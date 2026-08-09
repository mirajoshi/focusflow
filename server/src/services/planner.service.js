import PlannerEvent from '../models/PlannerEvent.model.js';
import ApiError from '../utils/ApiError.js';

export const createEvent = async (userId, eventData) => {
  const event = await PlannerEvent.create({ userId, ...eventData });
  return event;
};

export const getEvents = async (userId, { month, year } = {}) => {
  const query = { userId };

  if (month && year) {
    // month is 1-12; build a date-string range for the given month
    const paddedMonth = String(month).padStart(2, '0');
    const startDate = `${year}-${paddedMonth}-01`;
    const lastDay = new Date(year, month, 0).getDate(); // day 0 of next month = last day of this month
    const endDate = `${year}-${paddedMonth}-${String(lastDay).padStart(2, '0')}`;
    query.date = { $gte: startDate, $lte: endDate };
  }

  const events = await PlannerEvent.find(query).sort({ date: 1, startTime: 1 });
  return events;
};

export const getEventById = async (userId, eventId) => {
  const event = await PlannerEvent.findOne({ _id: eventId, userId });
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  return event;
};

export const updateEvent = async (userId, eventId, updates) => {
  const event = await PlannerEvent.findOne({ _id: eventId, userId });
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  Object.assign(event, updates);
  await event.save();
  return event;
};

export const deleteEvent = async (userId, eventId) => {
  const event = await PlannerEvent.findOneAndDelete({ _id: eventId, userId });
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  return event;
};