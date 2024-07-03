import { Request, Response } from "express";

import { GetAllProjectsUsecase } from "./get_all_projects_usecase";
import { UserFromToken } from "../../../shared/middlewares/jwt_middleware";
import { GetAllProjectsViewmodel } from "./get_all_projects_viewmodel";
import { ForbiddenAction, NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class GetAllProjectsController {
    constructor(private usecase: GetAllProjectsUsecase) { }

    async handle(req: Request, res: Response) {
        try {
            const projects = await this.usecase.execute();
            const viewmodel = new GetAllProjectsViewmodel(projects);
            return res.status(200).json(viewmodel.toJSON());

        } catch (error: any) {
            if (error instanceof NoItemsFound) {
                return res.status(404).json({ error: error.message });
            }
            if (error instanceof EntityError) {
                return res.status(400).json({ error: error.message });
            }
            if (error instanceof ForbiddenAction) {
                return res.status(401).json({ error: error.message });
            }
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
    }
}