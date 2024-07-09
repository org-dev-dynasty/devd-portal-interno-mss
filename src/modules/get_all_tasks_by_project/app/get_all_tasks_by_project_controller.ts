import { Request, Response } from "express";
import { UserFromToken } from "../../../shared/middlewares/jwt_middleware";
import { GetAllTasksByProjectUsecase } from "./get_all_tasks_by_project_usecase";
import {
  ForbiddenAction,
  NoItemsFound,
} from "../../../shared/helpers/errors/usecase_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { Forbidden } from "../../../shared/helpers/http/http_codes";
import { GetAllTasksByProjectViewmodel } from "./get_all_tasks_by_project_viewmodel";

export class GetAllTasksByProjectController {
  constructor(private usecase: GetAllTasksByProjectUsecase) {}

  async handle(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      const projectIdToken: string[] = req.user!.projects;
      const projectId: string = req.params.projectId;

      console.log("PROJECT ID PARAM NO CONTROLLER: " + projectId)
      console.log("PROJECT ID TOKEN NO CONTROLLER: " + projectIdToken)

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
      const viewmodel = new GetAllTasksByProjectViewmodel(tasks);
      const tasksViewModel = tasks.map((task) => viewmodel.toJSON());

      return res.status(200).json(tasksViewModel);
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
