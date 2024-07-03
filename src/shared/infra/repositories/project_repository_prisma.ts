import { PrismaClient } from "@prisma/client";
import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/repositories/project_repository_interface";
import { toEnum } from "../../domain/enums/status_enum";

const prisma = new PrismaClient();

export class ProjectRepositoryPrisma implements IProjectRepository {
  async createProject(projectProps: Project): Promise<Project> {
    try {
      const createdProjectFromPrisma = await prisma.project.create({
        data: {
          name: projectProps.projectName,
          status: projectProps.projectStatus,
          description: projectProps.projectDescription,
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

  async getAllProjects(): Promise<Project[]> {
    try {
      const projectsFromPrisma = await prisma.project.findMany();

      const projects = projectsFromPrisma.map((project) => {
        return new Project({
          projectName: project.name,
          projectStatus: toEnum(project.status),
          projectDescription: project.description,
        });
      });

      console.log("Projetos encontrados:", projects);

      return projects;
    } catch (error: any) {
      console.log("Erro ao buscar projetos:", error);
      throw new Error("Erro ao buscar projetos no banco de dados.");
    }
  }

  async getProjectById(projectId: string): Promise<Project | undefined> {
    try {
      const projectFromPrisma = await prisma.project.findUnique({
        where: {
          project_id: projectId,
        },
      });

      if (!projectFromPrisma) {
        throw new Error("Projeto não encontrado.");
        return undefined;
      }

      const project = new Project({
        projectId: projectFromPrisma.project_id,
        projectName: projectFromPrisma.name,
        projectStatus: toEnum(projectFromPrisma.status),
        projectDescription: projectFromPrisma.description,
      });
      console.log("Projeto encontrado:", project);
      return project || null;
    } catch (error: any) {
      console.log("Erro ao buscar projeto:", error);
      throw new Error("Erro ao buscar projeto no banco de dados.");
    }
  }
}
