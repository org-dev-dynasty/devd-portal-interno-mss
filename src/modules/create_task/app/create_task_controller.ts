import { Request, Response } from "express";
import { TaskProps } from "../../../shared/domain/entities/task";
import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { CreateTaskUsecase } from "./create_task_usecase";
import { CreateTaskViewModel } from "./create_task_viewmodel";
import { UserFromToken } from "../../../shared/middlewares/jwt_middleware";

  export class CreateTaskController {
    constructor(private usecase: CreateTaskUsecase) {}

    async createTask(req: Request, res: Response) {
      try {
        const userFromToken = req.user as UserFromToken;

        if (!userFromToken) {
          return res.status(403).json({ error: "Acesso negado." });
        }

        const created_user_id = userFromToken.id
        console.log("TENTANDO CRIAR TAREFA");
        const { taskName, taskStatus, taskDescription, taskFinishDate } = req.body;
  
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
        return new InternalServerError(error.message).send(res);
      }
    }
  }