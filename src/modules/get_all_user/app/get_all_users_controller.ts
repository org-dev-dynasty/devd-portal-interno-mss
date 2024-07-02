import { Request, Response } from "express";
import { GetAllUsersUsecase } from "./get_all_users_usecase";
import { GetAllUsersViewmodel } from "./get_all_users_vielmodel";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import { BadRequest, Forbidden, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { InvalidParameter, InvalidRequest } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class GetAllUsersController {
  constructor(private usecase: GetAllUsersUsecase) {}

  async handle(req: Request, res: Response) {
    try {
      const users = await this.usecase.execute();
      const usersViewModel = users.map(
        (user) => new GetAllUsersViewmodel(user)
      );
      res.status(200).json(usersViewModel);
    }  catch (error: any) {
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
        if (error instanceof NoItemsFound) {
          return new Forbidden(error.message).send(res);
        }
        return new InternalServerError('Internal Server Error').send(res);
      }
  }
}