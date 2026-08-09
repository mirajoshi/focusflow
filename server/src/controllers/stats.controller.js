import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getStatsOverview } from '../services/stats.service.js';

export const getStatsOverviewHandler = asyncHandler(async (req, res) => {
  const stats = await getStatsOverview(req.user._id);
  res.status(200).json(new ApiResponse(200, stats, 'Stats overview retrieved successfully'));
});