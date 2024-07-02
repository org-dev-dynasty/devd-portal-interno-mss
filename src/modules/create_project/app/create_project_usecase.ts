// Conteúdo do arquivo...
import { ProjectProps } from "../../../shared/domain/entities/project";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";


export class CreateProjectUsecase {
    constructor(private repo: IProjectRepository) {
    }

    async execute(projectProps: ProjectProps) {
        if (!projectProps.projectName) {
            throw new Error("Missing project name");
        }
        if (!projectProps.projectStatus) {
            throw new Error("Missing project status");
        }
        if (!projectProps.projectDescription) {
            throw new Error("Missing project description");
        }

        const newProject = await this.repo.createProject(projectProps);
        return newProject;
    }
}
