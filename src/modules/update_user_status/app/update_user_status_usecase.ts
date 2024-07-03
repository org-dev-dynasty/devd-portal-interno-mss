import { STATUS } from "../../../shared/domain/enums/status_enum";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";

export class UpdateUserStatusUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(id: string, status: STATUS): Promise<boolean> {
    const user = await this.repo.getUserById(id);

    if (!user) {
      throw new EntityError("User");
      return false;
    }

    user.setStatus(status);

    await this.repo.updateUserStatus(id, status);
    return true;
  }
}
