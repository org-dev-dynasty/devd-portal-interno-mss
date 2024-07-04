import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { NotFound } from "../../../shared/helpers/http/http_codes";

export class DeleteProjectUsecase {
  constructor(private repo: IProjectRepository) {}

  async execute(projectId: string): Promise<void> {
    try {
      await this.repo.deleteProject(projectId);
    } catch (error) {
      throw new NotFound("Projeto não encontrado");
    }
  }
}
