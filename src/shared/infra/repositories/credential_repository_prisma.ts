import { PrismaClient } from "@prisma/client";
import { ICredentialRepository } from "../../domain/repositories/credential_repository_interface";
import { Credential } from "../../domain/entities/credential";
import { UnprocessableEntity } from "../../helpers/http/http_codes";


const prisma = new PrismaClient();

export class CredentialRepositoryPrisma implements ICredentialRepository {
    async createCredential(projectId: string, envName: string, envContent: string): Promise<Credential> {
        try {
            const createdCredentialFromPrisma = await prisma.credential.create({
                data: {
                    project_id: projectId,
                    env_name: envName,
                    env_content: envContent,
                },
            });

            
            const createdCredential = new Credential(createdCredentialFromPrisma.project_id, createdCredentialFromPrisma.env_name, createdCredentialFromPrisma.env_content);
            return createdCredential;

        } catch (error: any) {
            console.error("Erro ao criar credencial:", error);
            throw new Error("Erro ao criar credencial no banco de dados.");
        }
    }

    async updateCredential(credentialId: string, projectId?: string, envName?: string, envContent?: string): Promise<Credential> {
        try {
            const updatedCredentialFromPrisma = await prisma.credential.update({
                where: {
                    credential_id: credentialId,
                },
                data: {
                    project_id: projectId,
                    env_name: envName,
                    env_content: envContent,
                },
            });

            const updatedCredential = new Credential(updatedCredentialFromPrisma.project_id, updatedCredentialFromPrisma.env_name, updatedCredentialFromPrisma.env_content);

            return updatedCredential;
        } catch (error: any) {
            console.error("Erro ao atualizar credencial:", error);
            throw new Error("Erro ao atualizar credencial no banco de dados.");
        }
    }

    async deleteCredential(credentialId: string): Promise<void> {
        try {
            const credential = await prisma.credential.delete({
                where: {
                    credential_id: credentialId,
                },
            });

            if (credential == null) {
                throw new UnprocessableEntity("Credencial não encontrada.");
            }

            await prisma.credential.delete({
                where: {
                    credential_id: credentialId,
                },
            });

        } catch (error: any) {
            console.error("Erro ao deletar credencial:", error);
            throw new Error("Erro ao deletar credencial no banco de dados.");
        }
    }

    async getCredentialById(credentialId: string): Promise<Credential> {

        if (!credentialId) {
            throw new Error("Credencial não encontrada.");
        }
        try {

            const credentialFromPrisma = await prisma.credential.findUnique({
                where: {
                    credential_id: credentialId,
                },
            });

            if (!credentialFromPrisma) { 
                throw new Error("Credencial não encontrada.");
            }

            const credential = new Credential(credentialFromPrisma.project_id, credentialFromPrisma.env_name, credentialFromPrisma.env_content);

            return credential;
        } catch (error: any) {
            console.error("Erro ao buscar credencial:", error);
            throw new Error("Erro ao buscar credencial no banco de dados.");
        }
    }

    async getAllCredentials(): Promise<Credential[]> {
        try {
            const credentialFromPrisma = await prisma.credential.findMany();

            const credentials = credentialFromPrisma.map((credential) => {
                return new Credential(credential.project_id, credential.env_name, credential.env_content);
            });

            console.log("Credenciais encontradas:", credentials);

            return credentials;
        } catch (error: any) {
            console.error("Erro ao buscar credenciais:", error);
            throw new Error("Erro ao buscar credenciais no banco de dados.");
        }
    }
}