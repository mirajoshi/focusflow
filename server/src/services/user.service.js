import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

export const updateProfile = async (userId, { name, timezone }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  if (name !== undefined) user.name = name;
  if (timezone !== undefined) user.timezone = timezone;
  await user.save();
  return user;
};

export const updatePreferences = async (userId, preferenceUpdates) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  user.preferences = { ...user.preferences.toObject(), ...preferenceUpdates };
  await user.save();
  return user;
};

export const deleteAccount = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};