// Conteúdo do arquivo...

import { Credential } from "../../../shared/domain/entities/credential";

export class CredentialViewModel {
    private credentialId?: string;
    private projectId?: string;
    private envName: string;
    private envContent: string;
    
    constructor(credential: Credential) {
        this.credentialId = credential.credentialId;
        this.projectId = credential.projectId;
        this.envName = credential.envName;
        this.envContent = credential.envContent;
    }

    toJSON() { 
        return {
            credentialId: this.credentialId,
            projectId: this.projectId,
            envName: this.envName,
            envContent: this.envContent
        }
    }
}

export class GetAllCredentialsViewModel {
    private credentialsViewModel: CredentialViewModel[]

    constructor(credentials: Credential[]) {
        this.credentialsViewModel = credentials.map(
            (credential) => new CredentialViewModel(credential)
        )
    }

    toJSON() {
        return {
            credentials: this.credentialsViewModel.map((credential) => credential.toJSON()),
            message: 'All credentials have been retrieved successfully',
        }
    }
}