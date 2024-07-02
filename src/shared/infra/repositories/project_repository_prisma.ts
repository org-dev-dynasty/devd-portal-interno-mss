import { PrismaClient } from "@prisma/client";
import { Project, ProjectProps } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/repositories/project_repository_interface";
import { toEnum } from "../../domain/enums/status_enum";

const prisma = new PrismaClient();

export class ProjectRepositoryPrisma implements IProjectRepository {

    async createProject(projectProps: ProjectProps): Promise<Project> {
        try {
            const createdProjectFromPrisma = await prisma.project.create({
                data: {
                    name: projectProps.projectName,
                    status: projectProps.projectStatus,
                    description: projectProps.projectDescription || '',
                },
            });
    
            const createdProject = new Project({
                projectName: createdProjectFromPrisma.name,
                projectStatus: toEnum(createdProjectFromPrisma.status),
                projectDescription: createdProjectFromPrisma.description,
            });
    
            return createdProject;
        } catch (error: any) {
            console.error("Erro ao criar projeto:", error);
            if (error.message.includes("Project already exists in the database.")) {
                throw new Error("Projeto já cadastrado.");
            }
            throw new Error("Erro ao criar projeto no banco de dados.");
        }
    }
}
