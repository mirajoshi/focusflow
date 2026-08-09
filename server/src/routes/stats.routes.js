import { Router } from 'express';
import { getStatsOverviewHandler } from '../controllers/stats.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/overview', getStatsOverviewHandler);

export default router;