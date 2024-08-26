import { Request, Response } from "express";
import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, Forbidden, InternalServerError, NoContent, ParameterError } from "../../../shared/helpers/http/http_codes";
import { GetParticipantByProjectUseCase } from "./get_participant_by_project_usecase";
import { GetParticipantByProjectViewmodel } from "./get_particpant_by_project_viewmodel";

export class GetParticipantByProjectController {
    private getParticipantByProjectUseCase: GetParticipantByProjectUseCase;

    constructor(private usecase: GetParticipantByProjectUseCase) {
        this.getParticipantByProjectUseCase = usecase;
    }

    async handle(req: Request, res: Response) {
        try {
            const project_id = req.params.project_id;

            if (!project_id) {
                return new MissingParameters('Project id');
                };

            const participants = await this.getParticipantByProjectUseCase.execute(project_id);
            const viewModels = participants.map(dto => new GetParticipantByProjectViewmodel(dto).toJSON());
            return res.status(200).json({"participants": viewModels, "message": "Participantes encontrados com sucesso"});
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
            if (error instanceof MissingParameters) {
              return new ParameterError(error.message).send(res);
            }
            if (error instanceof NoContent) {
                return new NoContent(error.getMessage()).send(res);
            }
            return new InternalServerError('Internal Server Error').send(res);
          }
    }
}