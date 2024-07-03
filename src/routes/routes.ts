

import { Express, Request, Response } from "express";
import AuthUserPresenter from "../modules/auth_user/app/auth_user_presenter";
import CreateProjectPresenter from "../modules/create_project/app/create_project_presenter";
import CreateTaskPresenter from "../modules/create_task/app/create_task_presenter";
import CreateUserPresenter from "../modules/create_user/app/create_user_presenter";
import GetAllProjectPresenter from "../modules/get_all_projects/app/get_all_projects_presenter";
import GetAllUsersPresenter from "../modules/get_all_user/app/get_all_users_presenter";
import GetUserByIdPresenter from "../modules/get_user_by_id/app/get_user_by_id_presenter";
import UpdateUserStatusPresenter from "../modules/update_user_status/app/update_user_status_presenter";
import CreateTaskPresenter from "../modules/create_task/app/create_task_presenter"
import GetAllProjectPresenter from "../modules/get_all_projects/app/get_all_projects_presenter";
import GetProjectByIdPresenter from "../modules/get_project_by_id/app/get_project_by_id_presenter";


const routes = (app: Express) => {
  app
    .route("/")
    .get((req: Request, res: Response) =>
      res.status(200).send("Api Portal Interno Dev Dynasty")
    );

  // user routes
  app.use("/api", CreateUserPresenter);
  app.use("/api", AuthUserPresenter);
  app.use("/api", GetAllUsersPresenter);
  app.use("/api", GetUserByIdPresenter);
  app.use("/api", UpdateUserStatusPresenter);

  // project routes
  app.use("/api", CreateProjectPresenter);
  app.use("/api", GetAllProjectPresenter);
  app.use("/api", GetProjectByIdPresenter)

  // task routes
  app.use("/api", CreateTaskPresenter)
};

export default routes;
