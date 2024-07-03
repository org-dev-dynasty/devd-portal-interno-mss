import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { UnprocessableEntity } from "../../../shared/helpers/http/http_codes";

export class DeleteProjectUsecase {
  constructor(private repo: IProjectRepository) {}

  async execute(projectId: string): Promise<void> {
    try {
      await this.repo.deleteProject(projectId);

    } catch (error: any) {
      throw new UnprocessableEntity("Projeto não encontrado");
    }
  }
}
