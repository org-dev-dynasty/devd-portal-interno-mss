import { CreateUserProps } from "../../../modules/create_user/app/create_user_controller";
import { IUserAll, User } from "../entities/user";

export interface IUserRepository {
  createUser(user: CreateUserProps): Promise<User>;
  getUserByEmail(email: string): Promise<IUserAll | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  updateUserStatus(id: string, status: string): Promise<boolean>;
}