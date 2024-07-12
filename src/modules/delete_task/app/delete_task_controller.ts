import { Request, Response } from "express";
import {
    InvalidParameter,
    InvalidRequest,
    MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import {
    BadRequest,
    Forbidden,
    InternalServerError,
    ParameterError,
    UnprocessableEntity,
} from "../../../shared/helpers/http/http_codes";
import { DeleteTaskUseCase } from "./delete_task_usecase";
import { DeleteTaskViewModel } from "./delete_task_viewmodel";

export class DeleteTaskController {
  constructor(private usecase: DeleteTaskUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const userAccess = req.user?.access;

      if (!userAccess?.includes("BTN-DELETE-TASK")) {
        throw new Forbidden(
          "You do not have permission to access this feature"
        );
      }
      const taskId  = Number(req.params.id);
      if (!taskId) {
        throw new MissingParameters("task id ");
      }

      await this.usecase.execute(Number(taskId));
      const viewModel = new DeleteTaskViewModel("Task deleted successfully.");
      res.status(200).send(viewModel);
    } catch (error) {
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
      return new InternalServerError("Internal Server Error").send(res);
    }
  }
}
