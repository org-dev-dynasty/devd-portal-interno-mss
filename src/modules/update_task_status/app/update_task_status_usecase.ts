import { TASK_STATUS } from "../../../shared/domain/enums/task_status_enum";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class UpdateTaskStatusUsecase {
    constructor(private repo: ITaskRepository) {}

    async execute(id: number, status: TASK_STATUS): Promise<boolean> {
        const task = await this.repo.getTaskById(id);

        if (!task) {
            throw new EntityError("Task");
            return false;
        }

        task.setTaskStatus(status);

        await this.repo.updateTask(task);
        return true;
    }
}