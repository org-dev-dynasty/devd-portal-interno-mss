import { Request, Response } from "express";
import { CreateUserUsecase } from "./create_user_usecase";
import { UserProps } from "../../../shared/domain/entities/user";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { CreateUserViewModel } from "./create_user_viewmodel";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, Forbidden, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { ConflictItems } from "../../../shared/helpers/errors/usecase_errors";

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
  access: number[];
}
export class CreateUserController {
  constructor(private usecase: CreateUserUsecase) {}

  async createUser(req: Request, res: Response) {
    try {
      const userAccess = req.user?.access;

      if(!userAccess?.includes('BTN-CREATE-USER')) {
        throw new Forbidden('You do not have permission to access this feature');
      }

      const { name, email, password, status, role, access } = req.body;

      if (!name) {
        throw new MissingParameters("Name");
      }
      if (!email) {
        throw new MissingParameters("Email");
      }
      if (!password) {
        throw new MissingParameters("Password");
      }
      if (!status) {
        throw new MissingParameters("Status");
      }
      if (!role) {
        throw new MissingParameters("Role");
      }
      if (!access) {
        throw new MissingParameters("Access");
      }

      const createUserProps: CreateUserProps = {
        name,
        email,
        password,
        status,
        role,
        access,
      };
      await this.usecase.execute(createUserProps);

      const viewModel = new CreateUserViewModel(
        "Usuário cadastrado com sucesso!"
      );
      res.status(201).json(viewModel);
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
      if(error instanceof ConflictItems) {
        return new ConflictItems(error.message);
      }
      return new InternalServerError('Internal Server Error').send(res);
    }
  }
}