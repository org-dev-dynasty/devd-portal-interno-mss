// Conteúdo do arquivo...
import { Request, Response } from "express";
import { Project } from "../../../shared/domain/entities/project";
import { CreateProjectViewModel } from "../../../modules/create_project/app/create_project_viewmodel";
import { CreateProjectUsecase } from "./create_project_usecase";
import { ParameterError, BadRequest, Forbidden, InternalServerError } from "../../../shared/helpers/http/http_codes";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class CreateProjectController {
  constructor(private usecase: CreateProjectUsecase) { }

  async createProject(req: Request, res: Response) {
    try {
      const userAccess = req.user?.access;

      if (!userAccess?.includes('BTN-CREATE-PROJECT')) {
        throw new Forbidden('You do not have permission to access this feature');
      }

      const userId = req.user?.user_id;
      if (!userId) {
        throw new Forbidden('You do not have permission to access this feature');
      }

      console.log("TENTANDO CRIAR PROJETO");
      const { projectName, projectStatus, projectDescription } = req.body;


      if (!projectName) {
        throw new MissingParameters("Project Name");
      }

      if (!projectStatus) {
        throw new MissingParameters("Project Status");
      }

      if (!projectDescription) {
        throw new MissingParameters("Project Description");
      }

      const project = new Project(projectName, projectDescription, projectStatus);

      await this.usecase.execute(project);
      const viewmodel = new CreateProjectViewModel(
        "Project created successfully"
      );
      return res.status(201).json(viewmodel);
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
      return new InternalServerError('Internal Server Error').send(res);
    }
  }
}
