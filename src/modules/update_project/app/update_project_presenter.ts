import express, { Request, Response } from "express";
import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import { UpdateProjectUsecase } from "./update_project_usecase";
import { UpdateProjectController } from "./update_project_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const projectRepository = new ProjectRepositoryPrisma();
const updateProjectUsecase = new UpdateProjectUsecase(projectRepository);
const updateProjectController = new UpdateProjectController(updateProjectUsecase);

router.put("/update-project", async (req: Request, res: Response) => {
    await updateProjectController.handle(req, res);
  });
  
  export default router;