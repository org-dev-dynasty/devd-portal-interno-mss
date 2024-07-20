// Conteúdo do arquivo...
import express, { Request, Response } from "express";
import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import { get } from "http";
import { GetAllProjectsUsecase } from "./get_all_projects_usecase";
import { GetAllProjectsController } from "./get_all_projects_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const projectRepository = new ProjectRepositoryPrisma();
const getAllProjectsUsecase = new GetAllProjectsUsecase(projectRepository);
const getAllProjectsController = new GetAllProjectsController(getAllProjectsUsecase);

router.get("/get-all-projects", authenticateToken, async (req: Request, res: Response) =>  await getAllProjectsController.handle(req, res));

export default router;
