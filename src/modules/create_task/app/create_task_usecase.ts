import { Task, TaskProps } from "../../../shared/domain/entities/task";
import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class CreateTaskUsecase {
    constructor(private repo: ITaskRepository) {}

    async execute(taskProps: TaskProps) {
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