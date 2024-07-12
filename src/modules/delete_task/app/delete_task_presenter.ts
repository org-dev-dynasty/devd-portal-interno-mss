import express, { Request, Response } from "express";
import { TaskRepositoryPrisma } from "../../../shared/infra/repositories/task_repository_prisma";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";
import { DeleteTaskController } from "./delete_task_controller";
import { DeleteTaskUseCase } from "./delete_task_usecase";


const router = express.Router();
const taskRepository = new TaskRepositoryPrisma();
const deleteTaskUsecase = new DeleteTaskUseCase(taskRepository);
const taskController = new DeleteTaskController(deleteTaskUsecase);

router.delete("/delete-task/:id",authenticateToken, async (req: Request, res: Response) => {
  await taskController.handle(req, res);
});

export default router;