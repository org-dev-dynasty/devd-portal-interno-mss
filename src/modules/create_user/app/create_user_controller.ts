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

export class CreateUserController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

  async createUser(req: Request, res: Response) {
    try {
      console.log("TENTANDO CRIAR USUÁRIO");
      const { name, email, role, password, telefone, cpf, status } = req.body;

      const errors = [];

      if (!name) {
        errors.push(new MissingParameters("Name"));
      }

      if (!email) {
        errors.push(new MissingParameters("Email"));
      }

      if (!password) {
        errors.push(new MissingParameters("Password"));
      }

      if (!status) {
        errors.push(new MissingParameters("Status"));
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const userProps: UserProps = {
        name,
        email,
        password,
        status,
      };
      await this.createUserUsecase.execute(userProps);

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
      return new InternalServerError('Internal Server Error').send(res);
    }
  }
}