import { Project } from "../../../shared/domain/entities/project";
import { STATUS } from "../../../shared/domain/enums/status_enum";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";


export class UpdateProjectUsecase {
  constructor(private repo: IProjectRepository) {}

  async execute(projectId: string, projectName?: string, projectDescription?: string, projectStatus?: STATUS): Promise<Project> {
    const project = await this.repo.getProjectById(projectId);

    if (!project) {
      throw new EntityError("Projeto");
    }

    if (projectName && !Project.isValidName(projectName)) {
        throw new EntityError("Nome de projeto inválido");
    }

    if (projectStatus && !Project.isValidStatus(projectStatus)) {
        throw new EntityError("Status de projeto inválido");
    }

    if (projectDescription && projectDescription.trim().length === 0) {
        throw new EntityError("Descrição de projeto inválida");
    }
    const updatedProject = await this.repo.updateProject(projectId, projectName, projectDescription, projectStatus);

    return updatedProject;
  }
}
