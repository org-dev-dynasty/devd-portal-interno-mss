import { Request, Response } from "express";
import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import { BadRequest, Forbidden, InternalServerError, ParameterError, UnprocessableEntity } from "../../../shared/helpers/http/http_codes";
import { GetTaskByIdUseCase } from "./get_task_by_id_usecase";
import { GetTaskByIdViewmodel } from "./get_task_by_id_viewmodel";

export class GetTaskByIdController {
    constructor(private getTaskByIdUsecase: GetTaskByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const taskId: number = Number(req.params.taskId);

      if (!taskId) {
        throw new MissingParameters("Invalid task id");
      }

      const task = await this.getTaskByIdUsecase.execute(taskId);

      if (!task) {
        return res.status(422).json({ error: "Task not found" });
      }

      const taskViewModel = new GetTaskByIdViewmodel(task);

      return res.status(200).json(taskViewModel);
    } catch (error: any) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message).send(res);
      }
      if (error instanceof InvalidParameter) {
        return new ParameterError(error.message).send(res);
      }
      if (error instanceof EntityError) {
        return new ParameterError(error.message).send(res);
      }
      if (error instanceof Forbidden) {
        return new Forbidden(error.getMessage()).send(res);
      }
      if (error instanceof NoItemsFound) {
        return new Forbidden(error.message).send(res);
      }
      if (error instanceof UnprocessableEntity) {
        return new UnprocessableEntity(error.getMessage()).send(res);
      }
      if (error instanceof MissingParameters) {
        return new ParameterError(error.message).send(res);
      }
      return new InternalServerError('Internal Server Error').send(res);
    }
  }
}
