import { PrismaClient } from "@prisma/client";
import { Project } from "../../domain/entities/project";
import { STATUS, toEnum } from "../../domain/enums/status_enum";
import { IProjectRepository } from "../../domain/repositories/project_repository_interface";
import { UnprocessableEntity } from "../../helpers/http/http_codes";
import { ParticipantDTO } from "../dto/participant_dto";
import { ProjectParticipantDTO } from "../dto/project_participant_dto";

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

  async createParticipant(projectId: string, userId: string): Promise<ParticipantDTO> {
    try {
      const participant = await prisma.participant.create({
        data: {
          project_id: projectId,
          user_id: userId,
        },
      });
      return new ParticipantDTO(
        participant.project_id,
        participant.user_id,
        participant.participant_id
      )
        
    } catch (error: any) {
      console.error("Erro ao adicionar participante ao projeto:", error);
      throw new Error("Erro ao adicionar participante ao projeto no banco de dados.");
    }
  }

  async getParticipantByProject(project_id: string): Promise<ProjectParticipantDTO[]> {
    try {
      const participants = await prisma.participant.findMany({
        where: {
          project_id: project_id,
        },
        include:{
          user: true,
        }
      });

      const participantDTOs = participants.map(participant => {
        return new ProjectParticipantDTO(
          participant.project_id,
          participant.user_id,  // Supondo que o campo id exista dentro do objeto user
          participant.participant_id,
          participant.user.name // Supondo que o campo name exista dentro do objeto user
        );
      });
      return participantDTOs;
    } catch (error: any) {
      console.error("Erro ao buscar participantes por projeto:", error);
      throw new Error("Erro ao buscar participantes por projeto no banco de dados.");
    }
  }
}