import { Request, Response } from "express";
import { GetAllTasksByProjectUsecase } from "./get_all_tasks_by_project_usecase";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, Forbidden, InternalServerError, OK, ParameterError } from "../../../shared/helpers/http/http_codes";
import { GetAllTasksByProjectViewmodel } from "./get_all_tasks_by_project_viewmodel";
import { InvalidParameter, InvalidRequest, MissingParameters } from "../../../shared/helpers/errors/controller_errors";

export class GetAllTasksByProjectController {
  constructor(private usecase: GetAllTasksByProjectUsecase) {}

  async handle(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      const projectIdToken: string[] = req.user!.projects;
      const projectId: string = req.params.projectId;

      console.log("PROJECT ID PARAM NO CONTROLLER: " + projectId);
      console.log("PROJECT ID TOKEN NO CONTROLLER: " + projectIdToken);

      if (!userId) {
        throw new EntityError("user id");
      }

      if (!projectId) {
        throw new EntityError("project id");
      }

      if (!projectIdToken.includes(projectId)) {
        throw new Forbidden("User does not have access to this project");
      }

      const tasks = await this.usecase.execute(userId, projectId);
      const viewmodel = tasks.map(
        (task) => new GetAllTasksByProjectViewmodel(task)
      );

      // return res.status(200).json({ tasks: viewmodel, message: "All tasks has been found" });
      return new OK({tasks: viewmodel}, "All tasks has been found");
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
