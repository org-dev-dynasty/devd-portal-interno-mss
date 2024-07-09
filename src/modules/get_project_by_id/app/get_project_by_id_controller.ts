import { Request, Response } from "express";
import { getProjectByIdUsecase } from "./get_project_by_id_usecase";
import { GetProjectByIdViewModel } from "./get_project_by_id_viewmodel";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  ParameterError,
} from "../../../shared/helpers/http/http_codes";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import {
  InvalidParameter,
  InvalidRequest,
} from "../../../shared/helpers/errors/controller_errors";

export class GetProjectByIdController {
  constructor(private usecase: getProjectByIdUsecase) {}

  async handle(req: Request, res: Response) {

    try {
      const projectId: string = req.params.projectId;

      const project = await this.usecase.execute(projectId);

      const viewModel = new GetProjectByIdViewModel(project);
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
      return new InternalServerError("Internal Server Error").send(res);
    }
  }
}
