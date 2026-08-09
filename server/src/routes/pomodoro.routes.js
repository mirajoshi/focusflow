import { Router } from 'express';
import {
  startSessionHandler,
  endSessionHandler,
  getSessionHistoryHandler,
  getTodaySummaryHandler,
} from '../controllers/pomodoro.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.post('/sessions', startSessionHandler);
router.patch('/sessions/:id/end', endSessionHandler);
router.get('/sessions', getSessionHistoryHandler);
router.get('/sessions/today-summary', getTodaySummaryHandler);

export default router;