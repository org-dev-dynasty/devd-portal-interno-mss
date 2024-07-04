import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import express, { Request, Response } from "express";
import { UpdateProjectStatusUsecase } from "./update_project_status_usecase";
import { UpdateProjectStatusController } from "./update_project_status_controller";


const router =  express.Router();
const updateProjectStatusRepository = new ProjectRepositoryPrisma();
const updateProjectStatusUseCase = new UpdateProjectStatusUsecase(updateProjectStatusRepository);
const updateProjectStatusController = new UpdateProjectStatusController(updateProjectStatusUseCase);

router.put("/update-project-status", async (req: Request, res: Response) => { 
    await updateProjectStatusController.handle(req, res);
});

export default router;