import { User } from "../entities/user";
import { STATUS } from "../enums/status_enum";

export interface IUserRepository {
  updateUserStatus(id: string, status: STATUS): Promise<boolean>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
}
