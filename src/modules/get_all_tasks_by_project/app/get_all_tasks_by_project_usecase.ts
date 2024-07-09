import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { UnprocessableEntity } from "../../../shared/helpers/http/http_codes";

export class GetAllTasksByProjectUsecase {
  constructor(private repo: ITaskRepository) {}

  async execute(userId: string, projectId: string) {
    if (!userId) {
      throw new EntityError("user id");
    }
    if (!projectId) {
      throw new EntityError("project id");
    }

    const isParticipant = await this.repo.isUserParticipantOfProject(userId, projectId);
    if (!isParticipant) {
      throw new UnprocessableEntity("User not participant of this project.");
    }

    const tasks = await this.repo.getAllTasksByProject(projectId);
    return tasks;
  }
}
