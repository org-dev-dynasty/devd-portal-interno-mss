import express, { Request, Response } from "express";
import { GetTaskByIdUseCase } from "../app/get_task_by_id_usecase";
import { GetTaskByIdController } from "../app/get_task_by_id_controller";
import { TaskRepositoryPrisma } from "../../../shared/infra/repositories/task_repository_prisma";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const taskRepositoryPrisma = new TaskRepositoryPrisma();
const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepositoryPrisma);
const getTaskByIdController = new GetTaskByIdController(
    getTaskByIdUseCase
);

router.get(
  "/get-task-id/:taskId",
  authenticateToken,
  async (req: Request, res: Response) => {
    await getTaskByIdController.handle(req, res);
  }
);

export default router;
