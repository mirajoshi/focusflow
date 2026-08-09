import { Router } from 'express';
import {
  createEventHandler,
  getEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from '../controllers/planner.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.post('/events', createEventHandler);
router.get('/events', getEventsHandler);
router.get('/events/:id', getEventByIdHandler);
router.patch('/events/:id', updateEventHandler);
router.delete('/events/:id', deleteEventHandler);

export default router;