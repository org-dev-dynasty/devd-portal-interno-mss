// Conteúdo do arquivo...

import { Project } from "../../../shared/domain/entities/project";
import { STATUS } from "../../../shared/domain/enums/status_enum";

export class ProjectViewmodel {
    private projectId?: string
    private projectName: string
    private projectStatus: STATUS
    private projectDescription?: string

  constructor(project: Project) {
    this.projectId = project.projectId;
    this.projectName = project.projectName;
    this.projectStatus = project.projectStatus;
    this.projectDescription = project.projectDescription;
  }

  toJSON() {
    return {
        projectId: this.projectId,
        projectName: this.projectName,
        projectStatus: this.projectStatus,
        projectDescription: this.projectDescription
    }
  }
}

export class GetAllProjectsViewmodel {
  private projectsViewmodel: ProjectViewmodel[]

  constructor(projects: Project[]) {
    this.projectsViewmodel = projects.map(
      (project) => new ProjectViewmodel(project)
    )
  }

  toJSON() {
    return {
      projects: this.projectsViewmodel.map((project) => project.toJSON()),
      message: 'All projects have been retrieved successfully',
    }
  }
}