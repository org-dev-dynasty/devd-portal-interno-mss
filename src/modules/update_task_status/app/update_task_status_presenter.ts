import express, { Request, Response } from "express";
import { TaskRepositoryPrisma } from "../../../shared/infra/repositories/task_repository_prisma";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";
import { updateTaskStatusController } from "./update_task_status_controller";
import { UpdateTaskStatusUsecase } from "./update_task_status_usecase";

const router = express.Router();
const taskRepository = new TaskRepositoryPrisma();
const updateTaskStatusUsecase = new UpdateTaskStatusUsecase(taskRepository);
const taskController = new updateTaskStatusController(updateTaskStatusUsecase);

router.put("/update-task-status/:id", authenticateToken, async (req: Request, res: Response) => {
  await taskController.handle(req, res);
});

export default router;