import { PrismaClient } from "@prisma/client";
import { Task, TaskProps } from "../../../shared/domain/entities/task";
import { STATUS } from "../../domain/enums/status_enum";
import { ITaskRepository } from "../../domain/repositories/task_repository_interface";

const prisma = new PrismaClient();

export class TaskRepositoryPrisma implements ITaskRepository {
  async createTask(taskProps: TaskProps): Promise<Task> {
    try {
      const createdTaskFromPrisma = await prisma.task.create({
        data: {
          name: taskProps.taskName,
          status: taskProps.taskStatus,
          description: taskProps.taskDescription || "",
          finish_date: taskProps.taskFinishDate || new Date(),
          created_at: taskProps.taskCreatedAt || new Date(),
          project: {},
          create_user_id: taskProps.create_user_id,
        },
      });
      const createdTask = new Task({
        taskName: createdTaskFromPrisma.name,
        taskStatus: (createdTaskFromPrisma.status) as STATUS,
        taskDescription: createdTaskFromPrisma.description,
        taskFinishDate: createdTaskFromPrisma.finish_date,
        taskCreatedAt: createdTaskFromPrisma.created_at,
        create_user_id: createdTaskFromPrisma.create_user_id
      });
      return createdTask;
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      if (error.message.includes("Task already exists in the database.")) {
        throw new Error("Tarefa já cadastrada.");
      }
      throw new Error("Erro ao criar tarefa no banco de dados.");
    }
  }
}
