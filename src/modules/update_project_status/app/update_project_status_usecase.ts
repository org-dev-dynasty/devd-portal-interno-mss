import { Project } from "../../../shared/domain/entities/project";
import { STATUS } from "../../../shared/domain/enums/status_enum";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";


export class UpdateProjectStatusUsecase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(projectId: string, projectStatus: STATUS): Promise<Project> {
    const project = await this.projectRepository.getProjectById(projectId);

    if (!project) {
      throw new Error("Projeto não encontrado.");
    }
    
    project.setProjectStatus(projectStatus); 

    return this.projectRepository.updateProjectStatus(projectId, projectStatus); 
  }
}