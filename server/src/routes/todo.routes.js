import { Router } from 'express';
import {
  createTodoHandler,
  getTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
  toggleTodoCompleteHandler,
} from '../controllers/todo.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

// Every todo route requires authentication
router.use(verifyJWT);

router.post('/', createTodoHandler);
router.get('/', getTodosHandler);
router.get('/:id', getTodoByIdHandler);
router.patch('/:id', updateTodoHandler);
router.delete('/:id', deleteTodoHandler);
router.patch('/:id/complete', toggleTodoCompleteHandler);

export default router;