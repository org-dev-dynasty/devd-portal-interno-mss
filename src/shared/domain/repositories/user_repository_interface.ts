import { IUserAll, User } from "../entities/user";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<IUserAll | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  updateUserStatus(id: string, status: string): Promise<boolean>;
}