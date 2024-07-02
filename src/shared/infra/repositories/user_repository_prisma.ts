import { PrismaClient } from "@prisma/client";
import { UserProps } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";
import { User } from "../../domain/entities/user";
import bcrypt from "bcrypt";
import { STATUS } from "../../domain/enums/status_enum";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements IUserRepository {
  async createUser(userProps: UserProps): Promise<User> {
    try {
      console.log("Criando novo usuário:", userProps);

      const existingUser = await prisma.user.findUnique({
        where: {
          email: userProps.email,
        },
      });

      if (existingUser) {
        throw new Error("User already exists in the database.");
      }

      const hashedPassword = await bcrypt.hash(userProps.password, 10);

      const createdUserFromPrisma = await prisma.user.create({
        data: {
          name: userProps.name,
          email: userProps.email,
          password: hashedPassword,
          status: userProps.status as string,
        },
      });

      const createdUser = new User({
        name: createdUserFromPrisma.name,
        email: createdUserFromPrisma.email,
        password: createdUserFromPrisma.password,
        status: createdUserFromPrisma.status as STATUS,
      });

      return createdUser;
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      if (error.message.includes("User already exists in the database.")) {
        throw new Error("Usuário já cadastrado.");
      }
      throw new Error("Erro ao criar usuário no banco de dados.");
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        return undefined; 
      }

      return new User({
        id: existingUser.user_id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        status: existingUser.status as STATUS,
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw new Error("Erro ao buscar usuário por email");
    }
  }

  async getUserById(id: string): Promise<User | undefined> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          user_id: id,
        },
      });

      if (!existingUser) {
        return undefined; 
      }

      return new User({
        id: existingUser.user_id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        status: existingUser.status as STATUS,
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por id:", error);
      throw new Error("Erro ao buscar usuário por id");
    }
  }
}