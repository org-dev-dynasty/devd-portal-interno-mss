import { Task, TaskProps } from "../entities/task";

export interface ITaskRepository {
    createTask(taskProps: TaskProps): Promise<Task>;
    updateTask(task: Task): Promise<Task>;
    // deleteTask(taskId: string): Promise<void>;
    getTaskById(taskId: number): Promise<Task | undefined>;
    // getAllTasks(): Promise<Task[]>;
}