import { Request, Response } from "express";
import { TaskProps } from "../../../shared/domain/entities/task";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  ParameterError,
} from "../../../shared/helpers/http/http_codes";
import { CreateTaskUsecase } from "./create_task_usecase";
import { CreateTaskViewModel } from "./create_task_viewmodel";

export class CreateTaskController {
  constructor(private usecase: CreateTaskUsecase) {}

  async createTask(req: Request, res: Response) {
    try {
      const userAccess = req.user?.access;

      if (!userAccess?.includes("BTN-CREATE-TASK")){
        throw new Forbidden("You do not have permission to access this feature")
      }
      
      const userId = req.user?.user_id;
      if(!userId) {
        throw new Forbidden("You do not have permission to access this feature")
      }

      const {
        taskName,
        taskStatus,
        taskDescription,
        taskFinishDate,
        project_id,
      } = req.body;

      const errors = [];

      if (!taskName) {
        errors.push(new MissingParameters("Name"));
      }

      if (!taskStatus) {
        errors.push(new MissingParameters("Status"));
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const taskProps: TaskProps = {
        taskName,
        taskStatus,
        taskDescription,
        taskFinishDate,
        create_user_id: userId,
        project_id,
      };
      await this.usecase.execute(taskProps);

      const viewModel = new CreateTaskViewModel(
        "Tarefa cadastrada com sucesso!"
      );
      res.status(201).json(viewModel);
    } catch (error: any) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message).send(res);
      }
      if (error instanceof InvalidParameter) {
        return new ParameterError(error.message).send(res);
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message).send(res);
      }
      if( error instanceof Forbidden) {
        return new Forbidden(error.getMessage()).send(res);
      }
      return new InternalServerError(error.message).send(res);
    }
  }
}
