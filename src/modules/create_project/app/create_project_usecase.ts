// Conteúdo do arquivo...
import { Project } from "../../../shared/domain/entities/project";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";


export class CreateProjectUsecase {
    constructor(private repo: IProjectRepository) {
    }
    async execute(project: Project) {
        if (!project.projectName) {
            throw new EntityError("project name");
        }
        if (!project.projectStatus) {
            throw new EntityError("Missing project status");
        }
        if (!project.projectDescription) {
            throw new EntityError("Missing project description");
        }
        const newProject = new Project(project.projectName, project.projectDescription, project.projectStatus);
        const projectNew = await this.repo.createProject(newProject.projectName, newProject.projectDescription, newProject.projectStatus);
        return projectNew;
    }
}
