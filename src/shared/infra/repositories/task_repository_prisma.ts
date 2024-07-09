import { PrismaClient } from "@prisma/client";
import { Task, TaskProps } from "../../../shared/domain/entities/task";
import { STATUS } from "../../domain/enums/status_enum";
import { ITaskRepository } from "../../domain/repositories/task_repository_interface";
import { MissingParameters } from "../../helpers/errors/controller_errors";
import { UnprocessableEntity } from "../../helpers/http/http_codes";
import { TASK_STATUS } from "../../domain/enums/task_status_enum";

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
        taskStatus: createdTaskFromPrisma.status as TASK_STATUS,
        taskDescription: createdTaskFromPrisma.description,
        taskFinishDate: createdTaskFromPrisma.finish_date,
        taskCreatedAt: createdTaskFromPrisma.created_at,
        create_user_id: createdTaskFromPrisma.create_user_id,
        project_id: createdTaskFromPrisma.project_id,
      });
      return createdTask;
    } catch (error: any) {
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
        taskStatus: taskFromPrisma.status as TASK_STATUS,
        taskDescription: taskFromPrisma.description,
        taskFinishDate: taskFromPrisma.finish_date,
        taskCreatedAt: taskFromPrisma.created_at,
        create_user_id: taskFromPrisma.create_user_id,
        project_id: taskFromPrisma.project_id,
      });
      return task;
    } catch (error: any) {
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
          taskStatus: task.status as TASK_STATUS,
          taskDescription: task.description,
          taskFinishDate: task.finish_date,
          taskCreatedAt: task.created_at,
          create_user_id: task.create_user_id,
          project_id: task.project_id,
        });
      });
      return allTasks;
    } catch (error) {
      throw new Error("Error in getAllTasksByProject function.");
    }
  }
  
  async updateTask(taskProps: TaskProps): Promise<Task> {
    try {
      const data: any = {};

    if (taskProps.taskName !== undefined) {
      data.name = taskProps.taskName;
    }

    if (taskProps.taskStatus !== undefined) {
      data.status = taskProps.taskStatus;
    }

    if (taskProps.taskDescription !== undefined) {
      data.description = taskProps.taskDescription;
    }

    if (taskProps.taskFinishDate !== undefined) {
      data.finish_date = taskProps.taskFinishDate;
    }

    if (taskProps.taskCreatedAt !== undefined) {
      data.created_at = taskProps.taskCreatedAt;
    }

    if (taskProps.project_id !== undefined) {
      data.project = {
        connect: {
          project_id: taskProps.project_id,
        },
      };
    }

    if (taskProps.create_user_id !== undefined) {
      data.create_user = {
        connect: {
          user_id: taskProps.create_user_id,
        },
      };
    }

    const updatedTaskFromPrisma = await prisma.task.update({
      where: {
        task_id: taskProps.taskId,
      },
      data,
    });


      const updatedTask = new Task({
        taskId: updatedTaskFromPrisma.task_id,
        taskName: updatedTaskFromPrisma.name,
        taskStatus: updatedTaskFromPrisma.status as TASK_STATUS,
        taskDescription: updatedTaskFromPrisma.description,
        taskFinishDate: updatedTaskFromPrisma.finish_date,
        taskCreatedAt: updatedTaskFromPrisma.created_at,
        create_user_id: updatedTaskFromPrisma.create_user_id,
        project_id: updatedTaskFromPrisma.project_id
      });
      return updatedTask;
    } catch (error: any) {
      console.error("Erro ao atualizar tarefa:", error);
      throw new Error("Erro ao atualizar tarefa no banco de dados.");
    }
  }
}
