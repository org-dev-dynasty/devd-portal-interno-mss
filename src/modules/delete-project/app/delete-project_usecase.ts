import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";


export class DeleteProjectUsecase {
    constructor(private repo: IProjectRepository) {
        this.repo = repo;
    }

    async execute(projectId: string) {
        try {
            const project = await this.repo.deleteProject(projectId);
            if (project === undefined) {
                throw new Error("Project not found.");
            }
            console.log("Projeto deletado:", project);
            return project;
        }
        catch (error: any) {
            console.error("Erro ao deletar projeto:", error);
            throw new EntityError("Project");
        }
    }
}