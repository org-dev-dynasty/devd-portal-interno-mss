// Conteúdo do arquivo...
import { Request, Response } from "express";
import { Forbidden } from "../../../shared/helpers/http/http_codes";
import { GetAllCredentialsUsecase } from "./get_all_credentials_usecase";
import { ForbiddenAction, NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { GetAllCredentialsViewModel } from "./get_all_credentials_viewmodel";


export class GetAllCredentialsController {
    constructor(private usecase: GetAllCredentialsUsecase) {
    }
    async handle(req: Request, res: Response) {
        const userRole = req.user?.role;

        if (userRole !== "ADMIN") {
            throw new Forbidden("You do not have permission to access this feature");
        }

        try {
            const credentials = await this.usecase.execute();
            const viewmodel = new GetAllCredentialsViewModel(credentials);
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