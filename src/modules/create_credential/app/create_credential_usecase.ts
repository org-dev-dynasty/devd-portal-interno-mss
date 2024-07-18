// Conteúdo do arquivo...
import { ICredentialRepository } from "../../../shared/domain/repositories/credential_repository_interface";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { Credential } from "../../../shared/domain/entities/credential";
import { NotFound } from "../../../shared/helpers/http/http_codes";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";


export class CreateCredentialUseCase {
    constructor(
        private repo: ICredentialRepository,
        private projectRepo: IProjectRepository
    ) { }

    async execute(credential: Credential) {
        const existingProject = credential.projectId
            ? await this.projectRepo.getProjectById(credential.projectId)
            : undefined;

        if (!existingProject) {
            throw new NotFound("Project not found");
        }

        if (!credential.projectId) {
            throw new EntityError("Missing project id")
        }

        if (!credential.envName) {
            throw new EntityError("Missing env name")
        }

        if (!credential.envContent) {
            throw new EntityError("Missing env content")
        }

        const newCredential = await this.repo.createCredential(credential.projectId, credential.envName, credential.envContent);
        return newCredential;

    }


}