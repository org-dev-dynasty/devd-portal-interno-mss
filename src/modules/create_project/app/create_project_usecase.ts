// Conteúdo do arquivo...
import { Project, ProjectProps } from "../../../shared/domain/entities/project";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";


export class CreateProjectUsecase {
    constructor(private repo: IProjectRepository) {
    }
    async execute(projectProps: ProjectProps) {
        if (!projectProps.projectName) {
            throw new EntityError("project name");
        }
        if (!projectProps.projectStatus) {
            throw new EntityError("Missing project status");
        }
        if (!projectProps.projectDescription) {
            throw new EntityError("Missing project description");
        }
        const newProject = new Project(projectProps);
        const project = await this.repo.createProject(newProject);
        return project;
    }
}
