import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getCurrentUser, updateProfile, updatePreferences, deleteAccount } from '../services/user.service.js';

const toSafeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  timezone: user.timezone,
  preferences: user.preferences,
});

export const getMeHandler = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user._id);
  res.status(200).json(new ApiResponse(200, toSafeUser(user), 'User retrieved successfully'));
});

export const updateProfileHandler = asyncHandler(async (req, res) => {
  const user = await updateProfile(req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, toSafeUser(user), 'Profile updated successfully'));
});

export const updatePreferencesHandler = asyncHandler(async (req, res) => {
  const user = await updatePreferences(req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, toSafeUser(user), 'Preferences updated successfully'));
});

export const deleteAccountHandler = asyncHandler(async (req, res) => {
  await deleteAccount(req.user._id);
  res.status(200).json(new ApiResponse(200, {}, 'Account deleted successfully'));
});