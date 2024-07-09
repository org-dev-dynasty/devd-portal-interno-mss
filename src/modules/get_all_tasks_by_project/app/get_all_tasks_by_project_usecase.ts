import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class GetAllTasksByProjectUsecase {
  constructor(private repo: ITaskRepository) {}

  async execute(userId: string, projectId: string) {
    console.log("PROJECT ID NO USECASE: " + projectId )
    if (!userId) {
      throw new EntityError("user id");
    }
    if (!projectId) {
      throw new EntityError("project id");
    }
    try {
      const tasks = this.repo.getAllTasksByProject(userId, projectId);
      return tasks;
    } catch (error) {
      throw new EntityError("Error getting tasks");
    }
  }
}
