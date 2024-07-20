import { PrismaClient } from "@prisma/client";
import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/repositories/project_repository_interface";
import { STATUS, toEnum } from "../../domain/enums/status_enum";
import { UnprocessableEntity } from "../../helpers/http/http_codes";

const prisma = new PrismaClient();

export class ProjectRepositoryPrisma implements IProjectRepository {
  async createProject(projectName: string, projectDescription: string, projectStatus: STATUS ): Promise<Project> {
    try {
      const createdProjectFromPrisma = await prisma.project.create({
        data: {
          name: projectName,
          status: projectStatus,
          description: projectDescription,
        },
      });

      const createdProject = new Project(createdProjectFromPrisma.name, createdProjectFromPrisma.description, toEnum(createdProjectFromPrisma.status));

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
        return new Project(project.name, project.description, toEnum(project.status));
      });

      console.log("Projetos encontrados:", projects);

      return projects;
    } catch (error: any) {
      console.log("Erro ao buscar projetos:", error);
      throw new Error("Erro ao buscar projetos no banco de dados.");
    }
  }

  async getProjectById(projectId: string): Promise<Project | undefined> {
    if (!projectId) {
      throw new Error("ID do projeto é necessário.");
    }
    
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

      const project = new Project(projectFromPrisma.name, projectFromPrisma.description, toEnum(projectFromPrisma.status));
      console.log("Projeto encontrado:", project);
      return project || null;
    } catch (error: any) {
      console.log("Erro ao buscar projeto:", error);
      throw new Error("Erro ao buscar projeto no banco de dados.");
    }
  }

  async updateProject(projectId: string, projectName?: string, projectDescription?: string, projectStatus?: STATUS): Promise<Project> {
    try {
      const updatedProjectFromPrisma = await prisma.project.update({
        where: {
          project_id: projectId,
        },
        data: {
          name: projectName,
          status: projectStatus,
          description: projectDescription,
        },
      });

      const updatedProject = new Project(updatedProjectFromPrisma.name, updatedProjectFromPrisma.description, toEnum(updatedProjectFromPrisma.status));

      return updatedProject;
    } catch (error: any) {
      console.error("Erro ao atualizar projeto:", error);
      throw new Error("Erro ao atualizar projeto no banco de dados.");
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      const project = await prisma.project.findUnique({
        where: {
          project_id: projectId,
        },
      });

      if (project == null) {
        throw new UnprocessableEntity("Projeto não encontrado.");
      }

      await prisma.project.delete({
        where: {
          project_id: projectId,
        },
      });

    } catch (error: any) {
      // console.error("Erro ao deletar projeto:", error);
      throw new Error("Erro ao deletar projeto no banco de dados.");
    }
  }

  async updateProjectStatus(projectId: string, projectStatus: STATUS): Promise<Project> {
    try {
      const updateProjectStatusFromPrisma = await prisma.project.update({
        where: {
          project_id: projectId,
        },
        data: {
          status: projectStatus,
        },
      });

      const updatedProject = new Project(updateProjectStatusFromPrisma.name, updateProjectStatusFromPrisma.description, toEnum(updateProjectStatusFromPrisma.status));

      return updatedProject;
    } catch (error: any) {
      console.error("Erro ao atualizar status do projeto:", error);
      throw new Error("Erro ao atualizar status do projeto no banco de dados.");
    }
  }
}
