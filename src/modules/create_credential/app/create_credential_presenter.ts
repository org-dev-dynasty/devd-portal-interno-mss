// Conteúdo do arquivo...
import express, { Request, Response } from "express";
import { CredentialRepositoryPrisma } from "../../../shared/infra/repositories/credential_repository_prisma";
import { CreateCredentialUseCase } from "./create_credential_usecase";
import { ProjectRepositoryPrisma } from "../../../shared/infra/repositories/project_repository_prisma";
import { CreateCredentialController } from "./create_credential_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router()
const credentialRepository = new CredentialRepositoryPrisma();
const projectRepository = new ProjectRepositoryPrisma();
const credentialUseCase = new CreateCredentialUseCase(credentialRepository, projectRepository);
const credentialController = new CreateCredentialController(credentialUseCase);

router.post("/create-credential", authenticateToken, async (req: Request, res: Response) => {
    await credentialController.createCredencial(req, res);
});

export default router;
