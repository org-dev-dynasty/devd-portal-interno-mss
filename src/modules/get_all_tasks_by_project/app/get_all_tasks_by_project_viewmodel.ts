import { Task } from "../../../shared/domain/entities/task";
import { TASK_STATUS } from "../../../shared/domain/enums/task_status_enum";

export class GetAllTasksByProjectViewmodel {
  taskId?: number;
  taskName: string;
  create_user_id: string;
  project_id: string;
  taskStatus: TASK_STATUS;
  taskDescription?: string;
  taskFinishDate?: Date;
  taskCreatedAt?: Date;

  constructor(task: Task) {
    this.taskId = task.taskId;
    this.taskName = task.taskName;
    this.create_user_id = task.create_user_id;
    this.project_id = task.project_id;
    this.taskStatus = task.taskStatus;
    this.taskDescription = task.taskDescription;
    this.taskFinishDate = task.taskFinishDate;
    this.taskCreatedAt = task.taskCreatedAt;
  }
}