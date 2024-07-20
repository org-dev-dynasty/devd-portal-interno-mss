import { Request, Response } from "express";
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
import { CreateParticipantUseCase } from "./create_participant_usecase";
import { CreateParticipantViewModel } from "./create_participant_viewmodel";

export class CreateParicipantController {
  constructor(private usecase: CreateParticipantUseCase) {}
  async createParticipant(req: Request, res: Response) {
    try {
      const userAccess = req.user?.access;

      if (!userAccess?.includes("BTN-CREATE-PARTICIPANT")) {
        throw new Forbidden(
          "You do not have permission to access this feature"
        );
      }

      const { project_id, user_id } = req.body;

      if (!project_id) {
        throw new MissingParameters("Project id");
      }

      if (!user_id) {
        throw new MissingParameters("User id");
      }

      const participant = await this.usecase.execute(project_id, user_id);
      return res.status(201).json(new CreateParticipantViewModel("Participant created successfully"));
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
      if (error instanceof MissingParameters) {
        return new ParameterError(error.message).send(res);
      }
      return new InternalServerError("Internal Server Error").send(res);
    }
  }
}
