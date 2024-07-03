import express, { Request, Response } from "express";
import { TaskRepositoryPrisma } from "../../../shared/infra/repositories/task_repository_prisma";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";
import { CreateTaskController } from "./create_task_controller";
import { CreateTaskUsecase } from "./create_task_usecase";

const router = express.Router();
const taskRepository = new TaskRepositoryPrisma();
const createTaskUsecase = new CreateTaskUsecase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUsecase);

router.post("/create-task", authenticateToken, async (req: Request, res: Response) => {
  await createTaskController.createTask(req, res);
});

export default router;
