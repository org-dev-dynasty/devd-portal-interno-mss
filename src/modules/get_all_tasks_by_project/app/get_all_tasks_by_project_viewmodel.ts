import { Task } from "../../../shared/domain/entities/task";
import { STATUS } from "../../../shared/domain/enums/status_enum";

export class TasksByProjectViewmodel {
  taskId?: number;
  taskName: string;
  create_user_id: string;
  project_id: string;
  taskStatus: STATUS;
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

  toJSON() {
    return {
      task_id: this.taskId,
      task_name: this.taskName,
      create_user_id: this.create_user_id,
      project_id: this.project_id,
      task_status: this.taskStatus,
      task_description: this.taskDescription,
      task_finish_date: this.taskFinishDate,
      task_created_at: this.taskCreatedAt,
    };
  }
}

export class GetAllTasksByProjectViewmodel {
  private tasksViewmodel: TasksByProjectViewmodel[]

  constructor(tasks: Task[]) {
    this.tasksViewmodel = tasks.map(
      (task) => new TasksByProjectViewmodel(task)
    )
  }

  toJSON() {
    return {
      projects: this.tasksViewmodel.map((project) => project.toJSON()),
      message: 'All projects have been retrieved successfully',
    }
  }
}