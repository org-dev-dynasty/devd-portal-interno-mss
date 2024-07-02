// Conteúdo do arquivo...
import { BadRequest, Forbidden, InternalServerError } from "http-errors";
import { ProjectProps } from "../../../shared/domain/entities/project";
import { MissingParameters } from "../../../shared/helpers/errors/controller_errors";
import { CreateProjectUsecase } from "./create_project_usecase";
import { Request, Response } from "express";



export class CreateProjectController {
    constructor(private createProjectUsecase: CreateProjectUsecase) {
    }

    async createProject(req: Request, res: Response) {
        try {
            console.log("TENTANDO CRIAR PROJETO");
            const { projectName, projectStatus, projectDescription } = req.body;

            const errors = [];

            if (!projectName) {
                errors.push(new MissingParameters("Project Name"));
            }

            if (!projectStatus) {
                errors.push(new MissingParameters("Project Status"));
            }

            if (!projectDescription) {
                errors.push(new MissingParameters("Project Description"));
            }

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            const projectProps: ProjectProps = {
                projectName,
                projectStatus,
                projectDescription,
            };
            await this.createProjectUsecase.execute(projectProps);

        } catch (error: any) {
            if (
                error instanceof BadRequest ||
                error instanceof Forbidden ||
                error instanceof InternalServerError
            ) {
                return res.status(error.status).json(error);
            }
            return res.status(500).json(new InternalServerError(error.message));
        }
    }
}