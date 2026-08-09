import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import habitRoutes from './routes/habit.routes.js';
import pomodoroRoutes from './routes/pomodoro.routes.js';
import plannerRoutes from './routes/planner.routes.js';
import statsRoutes from './routes/stats.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Allow requests from our frontend, and allow cookies to be sent
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// Parse incoming JSON request bodies (so req.body works)
app.use(express.json());

// Parse cookies from incoming requests (so req.cookies works)
app.use(cookieParser());

// Mount auth routes at /api/v1/auth
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/habits', habitRoutes);
app.use('/api/v1/pomodoro', pomodoroRoutes);
app.use('/api/v1/planner', plannerRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/users', userRoutes);

// Temporary test route to confirm the server works
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

// Error handling middleware - must be registered LAST
app.use(errorHandler);

export default app;