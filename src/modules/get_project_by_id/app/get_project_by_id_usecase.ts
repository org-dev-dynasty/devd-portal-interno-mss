import { Project } from "../../../shared/domain/entities/project";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";


export class getProjectByIdUsecase {
    constructor(private repo: IProjectRepository) { }

    async execute(projectId: string): Promise<Project> {
        try {
            const project = await this.repo.getProjectById(projectId);
            if (project === undefined) {
                throw new Error("Project not found.");
            }
            return project;
        } catch (error: any) {
            console.error("Error while searching project by id:", error);
            throw new Error("Error while searching project");
        }
    }
}
