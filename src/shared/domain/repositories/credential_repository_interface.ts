import { Credential } from "../entities/credential";



export interface ICredentialRepository { 
    createCredential(projectId: string, envName: string, envContent: string): Promise<Credential>;
    updateCredential(credentialId: string, projectId?: string, envName?: string, envContent?: string): Promise<Credential>;
    deleteCredential(credentialId: string): Promise<void>;
    getCredentialById(credentialId: string): Promise<Credential | undefined>;
    getAllCredentials(): Promise<Credential[]>;
}
