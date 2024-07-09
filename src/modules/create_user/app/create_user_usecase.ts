import { User, UserProps } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { CreateUserProps } from "./create_user_controller";

export class CreateUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(userProps: CreateUserProps) {
    if (!userProps.name) {
      throw new EntityError("Missing name");
    }
    if (!userProps.email) {
      throw new EntityError("Missing email");
    }
    if (!userProps.password) {
      throw new EntityError("Missing password");
    }
    if (!userProps.status) {
      throw new EntityError("Missing status");
    }
    if (!userProps.role) {
      throw new EntityError("Missing role");
    }
    if (!userProps.access) {
      throw new EntityError("Missing access");
    }

    const newUser = await this.repo.createUser(userProps);
    return newUser;
  }
}
