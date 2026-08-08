import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';

export const registerUser = async ({ name, email, password }) => {
  // Check if a user with this email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'A user with this email already exists');
  }

  // Hash the password before storing it — never store plain text
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Store the refresh token on the user document (supports multiple devices)
  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user, accessToken, refreshToken };
};