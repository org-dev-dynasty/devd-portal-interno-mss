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
                    projectName: projectProps.projectName,
                    projectStatus: projectProps.projectStatus,
                    projectDescription: projectProps.projectDescription || '',
                },
            });

            const createdProject = new Project({
                projectName: createdProjectFromPrisma.projectName,
                projectStatus: toEnum(createdProjectFromPrisma.projectStatus),
                projectDescription: createdProjectFromPrisma.projectDescription,
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

    async getAllProjects(): Promise<Project[]> {
        try {
            const projectsFromPrisma = await prisma.project.findMany();

            const projects = projectsFromPrisma.map((project) => {
                return new Project({
                    projectName: project.projectName,
                    projectStatus: toEnum(project.projectStatus),
                    projectDescription: project.projectDescription,
                });
            });

            console.log("Projetos encontrados:", projects);

            return projects;
        } catch (error: any) {
            console.log("Erro ao buscar projetos:", error);
            throw new Error("Erro ao buscar projetos no banco de dados.");
        }
    }
}
