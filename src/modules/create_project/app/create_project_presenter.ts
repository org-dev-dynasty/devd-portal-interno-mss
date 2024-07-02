// Conteúdo do arquivo...
import express, { Request, Response } from "express";
import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import { CreateProjectUsecase } from "./create_project_usecase";
import { CreateProjectController } from "./create_project_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const projectRepository = new ProjectRepositoryPrisma();
const projectUseCase = new CreateProjectUsecase(projectRepository);
const projectController = new CreateProjectController(projectUseCase);

router.post("/create-project", authenticateToken, async (req: Request, res: Response) => {
    await projectController.createProject(req, res);
  });
  
  export default router;
  