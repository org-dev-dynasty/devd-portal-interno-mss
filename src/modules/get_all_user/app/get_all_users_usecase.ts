import { User } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";

export class GetAllUsersUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(): Promise<User[]> {
    try {
      const users = this.repo.getAllUsers();
      return users
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
      throw new Error("Erro ao buscar todos os usuários");
    }
  }
}
