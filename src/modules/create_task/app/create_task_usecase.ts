import { Task, TaskProps } from "../../../shared/domain/entities/task";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { NotFound } from "../../../shared/helpers/http/http_codes";

export class CreateTaskUsecase {
  constructor(
    private repo: ITaskRepository,
    private projectRepository: IProjectRepository
  ) {}

  async execute(taskProps: TaskProps) {
    const existingProject = taskProps.project_id
      ? await this.projectRepository.getProjectById(taskProps.project_id)
      : undefined;

    if (!existingProject) {
      throw new NotFound("Project not found");
    }
    
    if (!taskProps.taskName) {
      throw new EntityError("Missing task name");
    }
    if (!taskProps.taskStatus) {
      throw new EntityError("Missing task status");
    }
    if (!taskProps.create_user_id) {
      throw new EntityError("Missing user id");
    }
    if (!taskProps.project_id) {
      throw new EntityError("Missing project id");
    }

    const newTask = await this.repo.createTask(taskProps);
    return newTask;
  }
}
