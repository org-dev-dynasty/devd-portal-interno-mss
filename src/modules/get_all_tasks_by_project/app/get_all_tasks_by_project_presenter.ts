// Conteúdo do arquivo...
import express, { Request, Response } from "express";
import { TaskRepositoryPrisma } from "../../../shared/infra/repositories/task_repository_prisma";
import { GetAllTasksByProjectUsecase } from "./get_all_tasks_by_project_usecase";
import { GetAllTasksByProjectController } from "./get_all_tasks_by_project_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const taskRepository = new TaskRepositoryPrisma();
const getAllTasksByProjectUsecase = new GetAllTasksByProjectUsecase(taskRepository);
const getAllTasksByProjectController = new GetAllTasksByProjectController(getAllTasksByProjectUsecase);

router.get("/get-all-tasks/:projectId", authenticateToken, async (req: Request, res: Response) =>  await getAllTasksByProjectController.handle(req, res));

export default router;
