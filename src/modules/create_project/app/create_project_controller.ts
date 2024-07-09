// Conteúdo do arquivo...
import { Request, Response } from "express";
import { ProjectProps } from "../../../shared/domain/entities/project";
import { CreateProjectViewModel } from "../../../modules/create_project/app/create_project_viewmodel";
import { CreateProjectUsecase } from "./create_project_usecase";
import { BadRequest, Forbidden, InternalServerError } from "http-errors";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { ParameterError } from "../../../shared/helpers/http/http_codes";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class CreateProjectController {
  constructor(private usecase: CreateProjectUsecase) {}

  async createProject(req: Request, res: Response) {
    try {
      const userAccess = req.user?.access;

      if(!userAccess?.includes('BTN-CREATE-USER')) {
        throw new Forbidden('You do not have permission to access this feature');
      }

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
      await this.usecase.execute(projectProps);
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
        return new Forbidden(error.message).send(res);
      }
      if (error instanceof MissingParameters) {
        return new ParameterError(error.message).send(res);
      }
      return new InternalServerError('Internal Server Error').send(res);
    }
  }
}
