import { Task } from "../../../shared/domain/entities/task";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class UpdateTaskUsecase {
  constructor(private repo: ITaskRepository) {}

  async execute(
      id: number,
      data: Partial<Task>,
  
    ): Promise<Partial<Task>> {
      if (!id) {
        throw new EntityError("Invalid task id");
      }
  
      const task = await this.repo.getTaskById(id);
  
      if (!task) {
        throw new EntityError("Task");
      }
      // let update_data: any = {};
  
      // if (data.name !== undefined) {
      //   if (Task.isValidName(data.name)) {
      //   update_data["name"] = data.name;
      //   }
      // }
  
      // if (data.status !== undefined) {
      //   update_data["status"] = data.status;
      // }
  
      // if (data.description !== undefined) {
      //   update_data["description"] = data.description;
      // }
  
      // if (data.finish_date !== undefined) {
      //   update_data["finish_date"] = data.finish_date;
      // }




  
      const updatedTask = await this.repo.updateTask(id, data);
      return updatedTask;
  
    }
}
