import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { registerUser, loginUser, logoutUser, refreshAccessToken } from '../services/auth.service.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser({ name, email, password });

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
      preferences: user.preferences,
    };

  res
    .status(200)
    .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json(new ApiResponse(200, { user: safeUser, accessToken }, 'Login successful'));
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  await logoutUser({ userId: req.user._id, refreshToken });

  res
    .status(200)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(200, {}, 'Logout successful'));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  const newAccessToken = await refreshAccessToken(incomingRefreshToken);

  res.status(200).json(new ApiResponse(200, { accessToken: newAccessToken }, 'Access token refreshed'));
});