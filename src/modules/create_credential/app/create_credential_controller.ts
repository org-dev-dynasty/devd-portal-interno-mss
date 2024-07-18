// Conteúdo do arquivo...
import { Request, Response } from "express";
import { CreateCredentialUseCase } from "./create_credential_usecase";
import { BadRequest, Forbidden, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { CreateCredentialViewModal } from "./create_credential_viewmodel";
import { Credential } from "../../../shared/domain/entities/credential";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class CreateCredentialController {
    constructor(private usecase: CreateCredentialUseCase) { }

    async createCredencial(req: Request, res: Response) {
        try {
            const userAccess = req.user?.access;

            if (!userAccess?.includes("BTN-CREATE-CREDENTIAL")) {
                throw new Forbidden("You do not have permission to access this feature")
            }

            const userId = req.user?.user_id
            if (!userId) {
                throw new Forbidden("You do not have permission to access this feature")
            }

            const {
                projectId,
                envName,
                envContent
            } = req.body;

            if (!projectId) {
                throw new MissingParameters("Project id")
            }

            if (!envName) {
                throw new MissingParameters("Env name")
            }

            if (!envContent) {
                throw new MissingParameters("Env content")
            }

            const credential = new Credential(projectId, envName, envContent)

            await this.usecase.execute(credential)
            const viewModel = new CreateCredentialViewModal("Credencial cadastrada com sucesso!");
            res.status(201).json(viewModel);
        } catch (error: any) {
            if (error instanceof InvalidRequest) {
                return new BadRequest(error.message).send(res);
            }
            if (error instanceof InvalidParameter) {
                return new ParameterError(error.message).send(res);
            }
            if (error instanceof EntityError) {
                return new ParameterError(error.message).send(res);
            }
            if (error instanceof Forbidden) {
                return new Forbidden(error.getMessage()).send(res);
            }
            if (error instanceof MissingParameters) {
                return new ParameterError(error.message).send(res);
            }
            return new InternalServerError('Internal Server Error').send(res);
        }
    }
}