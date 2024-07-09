import { Task, TaskProps } from "../entities/task";

export interface ITaskRepository {
  createTask(taskProps: TaskProps): Promise<Task>;
  // deleteTask(taskId: string): Promise<void>;
  updateTask(task: Task): Promise<Task>;
  getTaskById(taskId: number): Promise<Task | undefined>;
  getAllTasksByProject(userId: string, projectId: string): Promise<Task[]>;
}
