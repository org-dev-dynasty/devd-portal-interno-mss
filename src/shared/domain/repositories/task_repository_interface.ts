import { Task, TaskProps } from "../entities/task";

export interface ITaskRepository {
  createTask(taskProps: TaskProps): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
  updateTask(task: Task): Promise<Task>;
  getTaskById(taskId: number): Promise<Task | undefined>;
  isUserParticipantOfProject(userId: string, projectId: string): Promise<boolean>;
  getAllTasksByProject(projectId: string): Promise<Task[]>;
}
