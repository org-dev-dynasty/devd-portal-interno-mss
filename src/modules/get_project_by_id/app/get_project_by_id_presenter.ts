import express, { Request, Response } from "express";
import { getProjectByIdUsecase } from "../../get_project_by_id/app/get_project_by_id_usecase";
import { GetProjectByIdController } from "../../get_project_by_id/app/get_project_by_id_controller";
import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const projectRepository = new ProjectRepositoryPrisma();
const getProjectByIdUseCase = new getProjectByIdUsecase(projectRepository);
const getProjectByIdController = new GetProjectByIdController(
  getProjectByIdUseCase
);

router.get(
  "/get-project-id/:projectId",
  authenticateToken,
  async (req: Request, res: Response) => {
    await getProjectByIdController.handle(req, res);
  }
);

export default router;
