import { Request, Response } from "express";
import { getProjectByIdUsecase } from "./get_project_by_id_usecase";
import { GetProjectByIdViewModel } from "./get_project_by_id_viewmodel";

export class GetProjectByIdController {
    constructor(private usecase: getProjectByIdUsecase) { }

    async handle(req: Request, res: Response) {
        try {
            const projectId: string = req.params.projectId;

            const project = await this.usecase.execute(projectId);

            const viewModel = new GetProjectByIdViewModel(project);
            return res.status(200).json(viewModel);
        } catch (error: any) {
            console.error("Error while searching project by id:", error);
            return res.status(500).json({ message: "Error while searching project by id" });
        }
    }
}