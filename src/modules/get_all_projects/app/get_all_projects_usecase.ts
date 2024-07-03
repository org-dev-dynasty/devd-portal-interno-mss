// Conteúdo do arquivo...

import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";

export class GetAllProjectsUsecase {
    constructor(private repo: IProjectRepository) { }
    
    async execute() {
        const projects = await this.repo.getAllProjects();
        return projects;
    }
}