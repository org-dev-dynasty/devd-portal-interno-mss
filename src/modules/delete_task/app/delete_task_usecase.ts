import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { UnprocessableEntity } from "../../../shared/helpers/http/http_codes";

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: number): Promise<void> {
    try {
      await this.taskRepository.deleteTask(taskId);
    } catch (error: any) {
      throw new UnprocessableEntity("Erro ao deletar tarefa.");
    }
  }
}
