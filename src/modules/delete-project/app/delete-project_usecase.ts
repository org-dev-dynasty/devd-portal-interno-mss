import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";

export class DeleteProjectUsecase {
  constructor(private repo: IProjectRepository) {
    this.repo = repo;
  }
  async execute(projectId: string): Promise<void> {
    await this.repo.deleteProject(projectId);
  }
}
