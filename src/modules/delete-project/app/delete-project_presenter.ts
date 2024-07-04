import express, { Request, Response } from "express";
import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import { DeleteProjectUsecase } from "./delete-project_usecase";
import { DeleteProjectController } from "./delete-project_controller";

const router = express.Router()
const projectRepository = new ProjectRepositoryPrisma()
const deleteProjectUseCase = new DeleteProjectUsecase(projectRepository)
const deleteProjectController = new DeleteProjectController(deleteProjectUseCase)

router.delete(
    "/delete-project/:projectId",
    async (req: Request, res: Response) => {
        await deleteProjectController.handle(req, res)
    }
)

export default router;