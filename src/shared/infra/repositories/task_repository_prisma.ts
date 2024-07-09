import { PrismaClient } from "@prisma/client";
import { Task, TaskProps } from "../../../shared/domain/entities/task";
import { STATUS } from "../../domain/enums/status_enum";
import { ITaskRepository } from "../../domain/repositories/task_repository_interface";
import { MissingParameters } from "../../helpers/errors/controller_errors";
import { UnprocessableEntity } from "../../helpers/http/http_codes";

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
          project: {
            connect: {
              project_id: taskProps.project_id,
            },
          },
          create_user: {
            connect: {
              user_id: taskProps.create_user_id,
            },
          },
        },
      });
      const createdTask = new Task({
        taskName: createdTaskFromPrisma.name,
        taskStatus: createdTaskFromPrisma.status as STATUS,
        taskDescription: createdTaskFromPrisma.description,
        taskFinishDate: createdTaskFromPrisma.finish_date,
        taskCreatedAt: createdTaskFromPrisma.created_at,
        create_user_id: createdTaskFromPrisma.create_user_id,
        project_id: createdTaskFromPrisma.project_id,
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

  async getTaskById(taskId: number): Promise<Task> {
    try {
      const taskFromPrisma = await prisma.task.findUnique({
        where: {
          task_id: taskId,
        },
      });
      if (!taskFromPrisma) {
        throw new Error("Tarefa não encontrada.");
      }
      const task = new Task({
        taskId: taskFromPrisma.task_id,
        taskName: taskFromPrisma.name,
        taskStatus: taskFromPrisma.status as STATUS,
        taskDescription: taskFromPrisma.description,
        taskFinishDate: taskFromPrisma.finish_date,
        taskCreatedAt: taskFromPrisma.created_at,
        create_user_id: taskFromPrisma.create_user_id,
        project_id: taskFromPrisma.project_id,
      });
      return task;
    } catch (error: any) {
      console.error("Erro ao buscar tarefa:", error);
      throw new Error("Erro ao buscar tarefa no banco de dados.");
    }
  }

  async getAllTasksByProject(
    userId: string,
    projectId: string
  ): Promise<Task[]> {
    try {
      if (!userId) {
        throw new MissingParameters("userId");
      }
      if (!projectId) {
        throw new MissingParameters("projectId");
      }

      const participant = await prisma.participant.findFirst({
        where: {
          user_id: userId,
          project_id: projectId,
        },
        include: {
          responsibles: {
            include: {
              task: true,
            },
          },
        },
      });

      if (!participant) {
        throw new UnprocessableEntity("User not participant of this project.");
      }
      
      const tasks = await prisma.task.findMany({
        where: {
          project_id: projectId,
        },
      });
      const allTasks = tasks.map((task: any) => {
        return new Task({
          taskId: task.task_id,
          taskName: task.name,
          taskStatus: task.status as STATUS,
          taskDescription: task.description,
          taskFinishDate: task.finish_date,
          taskCreatedAt: task.created_at,
          create_user_id: task.create_user_id,
          project_id: task.project_id,
        });
      });
      console.log("TAREFAS TASK -> " + tasks);
      console.log("TAREFAS -> " + allTasks);
      return allTasks;
    } catch (error) {
      console.error(error);
      throw new Error("Error in getAllTasksByProject function.");
    }
  }
}
