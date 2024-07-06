import { Task } from "../../../shared/domain/entities/task";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class GetTaskByIdUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(taskId: number): Promise<Task> {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) {
        throw new EntityError("task");
      }
      return task;
    } catch (error) {
      throw new Error("Task not found");
    }
  }
}
