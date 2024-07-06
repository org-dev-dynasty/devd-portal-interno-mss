import { Request, Response } from "express";
import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, Forbidden, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { UpdateUserStatusUsecase } from "./update_user_status_usecase";
import { UpdateStatusViewmodel } from "./update_user_status_viewmodel";

export class updateUserStatusController {
  constructor(private usecase: UpdateUserStatusUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {

      const userAccess = req.user?.access;

      if(!userAccess?.includes('BTN-UPDATE-USER-STATUS')) {
        throw new Forbidden('You do not have permission to access this feature');
      }

      const { user_id, status } = req.body;
      const errors = [];
      if (!user_id) {
        errors.push(new MissingParameters("Name"));
      }

      if (!status) {
        errors.push(new MissingParameters("Email"));
      }

      await this.usecase.execute(user_id, status);
      return res
        .status(200)
        .json(new UpdateStatusViewmodel("Status atualizado com sucesso"));
    } catch (error: any) {
        if (error instanceof InvalidRequest) {
            return res.status(400).json(new BadRequest(error.message));
        }
        if (error instanceof InvalidParameter) {
            return res.status(400).json(new ParameterError(error.message));
        }
        if (error instanceof EntityError) {
            return res.status(400).json(new ParameterError(error.message));
        }
        if (error instanceof Forbidden) {
            return res.status(403).json(new Forbidden(error.getMessage()));
        }
        return res.status(500).json(new InternalServerError("Internal Server Error"));
    }
  }
}
