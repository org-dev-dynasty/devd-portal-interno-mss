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
import { Project, ProjectProps } from "../../../shared/domain/entities/project";

export class UpdateProjectController {
  constructor(private usecase: UpdateProjectUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const project_id = req.params.project_id;
      console.log("PROJECT ID VINDO DOS PARAMS " + project_id);
      const { projectName, projectDescription, projectStatus } = req.body;
      const errors = [];

      if (!project_id) {
        errors.push("projectId");
      }

      if (!projectName) {
        errors.push(new MissingParameters("Project Name"));
      }

      if (!projectDescription) {
        errors.push(new MissingParameters("Project Description"));
      }

      if (!projectStatus) {
        errors.push(new MissingParameters("Project Status"));
      }

      await this.usecase.execute(
        project_id,
        projectName,
        projectDescription,
        projectStatus
      );
      const projectProps: ProjectProps = {
        projectId: project_id,
        projectName,
        projectDescription,
        projectStatus,
      };
      const updatedProject = new Project(projectProps);
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
