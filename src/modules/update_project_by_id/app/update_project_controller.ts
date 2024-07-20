import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { UpdateProjectUsecase } from "./update_project_usecase";
import { Request, Response } from "express";
import { UpdateProjectViewModel } from "./update_project_viewmodel";
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  ParameterError,
} from "../../../shared/helpers/http/http_codes";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { Project } from "../../../shared/domain/entities/project";

export class UpdateProjectController {
  constructor(private usecase: UpdateProjectUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userAccess = req.user?.access;
      if (!userAccess?.includes("BTN-UPDATE-PROJECT")) { 
        throw new Forbidden("You do not have permission to access this feature");
      }

      const project_id = req.params.project_id;
      if (!project_id) { 
        throw new MissingParameters("Project ID"); 
      }

      const { projectName, projectDescription, projectStatus } = req.body;
      if (!projectName) {
        throw new MissingParameters("Project Name");
      }

      if (!projectDescription) {
        throw new MissingParameters("Project Description");
      }

      if (!projectStatus) {
        throw new MissingParameters("Project Status");
      }

      await this.usecase.execute(
        project_id,
        projectName,
        projectDescription,
        projectStatus
      );
      const updatedProject = new Project(projectName, projectDescription, projectStatus);
      return res.status(200).json(new UpdateProjectViewModel(updatedProject));
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
      return res
        .status(500)
        .json(new InternalServerError("Internal Server Error"));
    }
  }
}
