import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { registerUser, loginUser } from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser({ name, email, password });

  // Never send passwordHash back to the client, even hashed
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  res.status(201).json(new ApiResponse(201, safeUser, 'User registered successfully'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser({ email, password });

  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  // Set refresh token as httpOnly cookie — inaccessible to JS, protecting against XSS
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };

  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user: safeUser, accessToken }, 'Login successful'));
});