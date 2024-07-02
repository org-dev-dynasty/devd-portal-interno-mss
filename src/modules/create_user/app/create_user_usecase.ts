import { User, UserProps } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class CreateUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(userProps: UserProps) {
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

    const newUser = await this.repo.createUser(new User(userProps));
    return newUser;
  }
}
