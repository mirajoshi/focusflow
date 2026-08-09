import { Router } from 'express';
import {
  getMeHandler,
  updateProfileHandler,
  updatePreferencesHandler,
  deleteAccountHandler,
} from '../controllers/user.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/me', getMeHandler);
router.patch('/me', updateProfileHandler);
router.patch('/me/preferences', updatePreferencesHandler);
router.delete('/me', deleteAccountHandler);

export default router;