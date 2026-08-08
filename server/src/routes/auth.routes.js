import { Router } from 'express';
import { register, login, logout, refreshToken } from '../controllers/auth.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', verifyJWT, logout);

// Protected test route - only accessible with a valid access token
router.get('/me', verifyJWT, (req, res) => {
  res.json({
    success: true,
    data: { _id: req.user._id, name: req.user.name, email: req.user.email },
    message: 'Authenticated user retrieved',
  });
});

export default router;