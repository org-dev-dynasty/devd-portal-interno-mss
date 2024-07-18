import express from 'express';
import { UpdateTaskController } from './update_task_controller';
import { TaskRepositoryPrisma } from '../../../shared/infra/repositories/task_repository_prisma';
import { UpdateTaskUsecase } from './update_task_usecase';
import { authenticateToken } from '../../../shared/middlewares/jwt_middleware';

const router = express.Router();
const taskRepository = new TaskRepositoryPrisma();
const updateTask = new UpdateTaskUsecase(taskRepository);
const taskController = new UpdateTaskController(updateTask);

router.put("/update-task/:id", authenticateToken, async (req, res) => {
  await taskController.handle(req, res);
});

export default router;