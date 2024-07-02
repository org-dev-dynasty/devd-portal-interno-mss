import { Express, Request, Response } from "express";
import CreateUserPresenter from "../modules/create_user/app/create_user_presenter";
import AuthUserPresenter from "../modules/auth_user/app/auth_user_presenter";
import GetAllUsersPresenter from "../modules/get_all_user/app/get_all_users_presenter";
import CreateProjectPresenter from "../modules/create_project/app/create_project_presenter";

import app from "../app";
import { GetAllUsersController } from "../modules/get_all_user/app/get_all_users_controller";

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

  // project routes
  app.use("/api", CreateProjectPresenter);
};

export default routes;
