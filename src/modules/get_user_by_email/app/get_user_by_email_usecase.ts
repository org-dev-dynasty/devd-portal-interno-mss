import { IUserAll } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";

export class GetUserByEmailUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(email: string): Promise<IUserAll | undefined> {
    return this.repo.getUserByEmail(email);
  }
}
