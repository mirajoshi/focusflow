import { Router } from 'express';
import {
  createHabitHandler,
  getHabitsHandler,
  getHabitByIdHandler,
  updateHabitHandler,
  deleteHabitHandler,
  checkInHabitHandler,
  getHabitLogsHandler,
} from '../controllers/habit.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.post('/', createHabitHandler);
router.get('/', getHabitsHandler);
router.get('/:id', getHabitByIdHandler);
router.patch('/:id', updateHabitHandler);
router.delete('/:id', deleteHabitHandler);
router.post('/:id/checkin', checkInHabitHandler);
router.get('/:id/logs', getHabitLogsHandler);

export default router;