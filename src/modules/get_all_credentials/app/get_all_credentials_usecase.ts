// Conteúdo do arquivo...
import { ICredentialRepository } from "../../../shared/domain/repositories/credential_repository_interface";
import { Credential } from "../../../shared/domain/entities/credential";

export class GetAllCredentialsUsecase {
    constructor(private repo: ICredentialRepository) {
    }

    async execute(): Promise<Credential[]> {
        const credentials = await this.repo.getAllCredentials();
        return credentials as Credential[];
    }
}