const cookieParser = require("cookie-parser");
import { Express, Request, Response } from "express";
import AuthUserPresenter from "../modules/auth_user/app/auth_user_presenter";
import CreateCredentialPresenter from "../modules/create_credential/app/create_credential_presenter";
import CreateParticipantPresenter from "../modules/create_participant/app/create_participant_presenter";
import CreateProjectPresenter from "../modules/create_project/app/create_project_presenter";
import CreateTaskPresenter from "../modules/create_task/app/create_task_presenter";
import CreateUserPresenter from "../modules/create_user/app/create_user_presenter";
import DeleteProjectPresenter from "../modules/delete-project/app/delete-project_presenter";
import DeleteTaskPresenter from "../modules/delete_task/app/delete_task_presenter";
import GetAllCredentialsPresenter from "../modules/get_all_credentials/app/get_all_credentials_presenter";
import GetAllProjectPresenter from "../modules/get_all_projects/app/get_all_projects_presenter";
import GetAllTasksByProjectPresenter from "../modules/get_all_tasks_by_project/app/get_all_tasks_by_project_presenter";
import GetAllUsersPresenter from "../modules/get_all_user/app/get_all_users_presenter";
import GetParticipantByProjectPresenter from "../modules/get_participant_by_project/app/get_participant_by_project_presenter";
import GetProjectByIdPresenter from "../modules/get_project_by_id/app/get_project_by_id_presenter";
import GetTaskByIdPresenter from "../modules/get_task_by_id/app/get_task_by_id_presenter";
import GetUserByIdPresenter from "../modules/get_user_by_id/app/get_user_by_id_presenter";
import UpdateProjectPresenter from "../modules/update_project_by_id/app/update_project_presenter";
import UpdateProjectStatusPresenter from "../modules/update_project_status/app/update_project_status_presenter";
import UpdateTaskPresenter from "../modules/update_task/app/update_task_presenter";
import UpdateTaskStatusPresenter from "../modules/update_task_status/app/update_task_status_presenter";
import UpdateUserStatusPresenter from "../modules/update_user_status/app/update_user_status_presenter";

const routes = (app: Express) => {
  app
    .route("/")
    .get((req: Request, res: Response) =>
      res.status(200).send("Api Portal Interno Dev Dynasty")
    );

  // middlewares cookie parser
  app.use(cookieParser());

  // user routes
  app.use("/api", CreateUserPresenter);
  app.use("/api", AuthUserPresenter);
  app.use("/api", GetAllUsersPresenter);
  app.use("/api", GetUserByIdPresenter);
  app.use("/api", UpdateUserStatusPresenter);

  // project routes
  app.use("/api", CreateProjectPresenter);
  app.use("/api", GetAllProjectPresenter);
  app.use("/api", GetProjectByIdPresenter);
  app.use("/api", UpdateProjectPresenter);
  app.use("/api", DeleteProjectPresenter);
  app.use("/api", UpdateProjectStatusPresenter);
  
  // participant routes
  app.use("/api", CreateParticipantPresenter);
  app.use("/api", GetParticipantByProjectPresenter);
  // task routes
  app.use("/api", CreateTaskPresenter)
  app.use("/api",GetTaskByIdPresenter)
  app.use("/api", UpdateTaskStatusPresenter)
  app.use("/api", CreateTaskPresenter);
  app.use("/api", GetTaskByIdPresenter);
  app.use("/api", GetAllTasksByProjectPresenter);
  app.use("/api", DeleteTaskPresenter);
  app.use("/api", UpdateTaskPresenter);

  //credential routes
  app.use("/api", CreateCredentialPresenter);
  app.use("/api", GetAllCredentialsPresenter);
};




export default routes;
