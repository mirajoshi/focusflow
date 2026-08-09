import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../services/planner.service.js';

export const createEventHandler = asyncHandler(async (req, res) => {
  const event = await createEvent(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, event, 'Event created successfully'));
});

export const getEventsHandler = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  const events = await getEvents(req.user._id, { month, year });
  res.status(200).json(new ApiResponse(200, events, 'Events retrieved successfully'));
});

export const getEventByIdHandler = asyncHandler(async (req, res) => {
  const event = await getEventById(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, event, 'Event retrieved successfully'));
});

export const updateEventHandler = asyncHandler(async (req, res) => {
  const event = await updateEvent(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, event, 'Event updated successfully'));
});

export const deleteEventHandler = asyncHandler(async (req, res) => {
  await deleteEvent(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, {}, 'Event deleted successfully'));
});