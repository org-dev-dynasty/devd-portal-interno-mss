import { Task, TaskProps } from "../entities/task";

export interface ITaskRepository {
  createTask(taskProps: TaskProps): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
  updateTask(id: number, data: Partial<Task>): Promise<Task>;
  updateTaskStatus(status: string, taskId: number): Promise<Task>;
  getTaskById(taskId: number): Promise<Task | undefined>;
  isUserParticipantOfProject(userId: string, projectId: string): Promise<boolean>;
  getAllTasksByProject(projectId: string): Promise<Task[]>;
}
