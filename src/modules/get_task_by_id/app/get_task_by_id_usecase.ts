import { Task } from "@prisma/client";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";

export class GetTaskByIdUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(taskId: number): Promise<Task> {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (task === undefined) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error) {
      throw new Error("Task not found");
    }
  }
}
