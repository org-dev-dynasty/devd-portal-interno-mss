import { Task } from "@prisma/client";
import { TASK_STATUS } from "../../../shared/domain/enums/task_status_enum";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class UpdateTask {
  constructor(private repo: ITaskRepository) {}

  async execute(
    id: number,
    name: string,
    status: TASK_STATUS,
    description: string,
    finish_date: Date,

  ): Promise<Task> {
    if (!id) {
      throw new EntityError("Invalid task id");
    }

    if (!Object.values(TASK_STATUS).includes(status)) {
      throw new EntityError("Invalid status");
    }

    const task = await this.repo.getTaskById(id);

    if (!task) {
      throw new EntityError("Task");
    }
    const data: any = {};

    if (name !== undefined) {
      data.name = name;
    }

    if (status !== undefined) {
      data.status = status;
    }

    if (description !== undefined) {
      data.description = description;
    }

    if (finish_date !== undefined) {
      data.finish_date = finish_date;
    }

    const updatedTask = await this.repo.updateTask(id, data);
    return updatedTask;

  }
}
