// Conteúdo do arquivo...
import express, { Request, Response } from "express";
import { CredentialRepositoryPrisma } from "../../../shared/infra/repositories/credential_repository_prisma";
import { GetAllCredentialsUsecase } from "./get_all_credentials_usecase";
import { GetAllCredentialsController } from "./get_all_credentials_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const credentialRepository = new CredentialRepositoryPrisma();
const getAllCredentialUsecase = new GetAllCredentialsUsecase(credentialRepository);
const getAllCredentialController = new GetAllCredentialsController(getAllCredentialUsecase);

router.get("/get-all-credentials", authenticateToken, async (req: Request, res: Response) => await getAllCredentialController.handle(req, res));

export default router;