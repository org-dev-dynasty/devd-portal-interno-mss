import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, Forbidden, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { UpdateProjectStatusUsecase } from "./update_project_status_usecase";
import { Request, Response } from "express";
import { UpdateProjectStatusViewmodel } from "./update_project_status_viewmodel";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";


export class UpdateProjectStatusController {
    constructor(private usecase: UpdateProjectStatusUsecase) { }

    async handle(req: Request, res: Response): Promise<Response> {        
        try {
            const { project_id, status } = req.body;
            if (!project_id) {
                throw new MissingParameters("Project ID")
            }
            if (!status) {
                throw new MissingParameters("Project Status")
            }

            await this.usecase.execute(project_id, status);
            return res.status(200).json(new UpdateProjectStatusViewmodel("Project status updated successfully"));
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
            if (error instanceof MissingParameters) {
                return res.status(422).json(new MissingParameters(error.message));
            }
            return res.status(500).json(new InternalServerError("Internal Server Error"));
        }
    }
}