import { Request, Response } from "express";
import { DeleteProjectUsecase } from "./delete-project_usecase";
import { DeleteProjectViewModel } from "./delete-project_viewmodel";
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  ParameterError,
  UnprocessableEntity,
} from "../../../shared/helpers/http/http_codes";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";

export class DeleteProjectController {
  constructor(private usecase: DeleteProjectUsecase) {}

  async handle(req: Request, res: Response) {
    const userRole = req.user?.role;
    if (userRole !== "ADMIN") {
      throw new Forbidden("You do not have permission to access this feature");
    }

    const userAccess = req.user?.access;
    if (!userAccess?.includes("BTN-DELETE-PROJECT")) {
      throw new Forbidden("You do not have permission to access this feature");
    }

    try {
      const projectId: string = req.params.projectId;
      if (!req.params) {
        throw new MissingParameters("Missing parameters.");
      }

      if (!projectId) {
        throw new MissingParameters("Missing project id.");
      }

      await this.usecase.execute(projectId);
      const viewModel = new DeleteProjectViewModel(
        "Project deleted successfully."
      );
      return res.status(200).json(viewModel);
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
      return new InternalServerError("Internal Server Error").send(res);
    }
  }
}
