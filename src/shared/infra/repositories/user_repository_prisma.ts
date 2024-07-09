
import { PrismaClient } from "@prisma/client";
import { IUserAll, UserProps } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";
import { User } from "../../domain/entities/user";
import bcrypt from "bcrypt";
import { STATUS } from "../../domain/enums/status_enum";
import { CreateUserProps } from "../../../modules/create_user/app/create_user_controller";
import { connect } from "http2";
import { ConflictItems } from "../../helpers/errors/usecase_errors";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements IUserRepository {
  async getAllUsers(): Promise<User[]> {
    try {
      const allUsersFromPrisma = await prisma.user.findMany();

      const allUsers = allUsersFromPrisma.map((user: any) => {
        return new User({
          id: user.user_id,
          name: user.name,
          email: user.email,
          password: user.password,
          status: user.status as STATUS,
          createdAt: user.created_at,
        });
      });
      return allUsers;
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
      throw new Error("Erro ao buscar todos os usuários");
    }
  }

  async createUser(userProps: CreateUserProps): Promise<User> {
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
          status: userProps.status
        }
      });

      const createdProfileFromPrisma = await prisma.profile.create({
        data: {
          user_id: createdUserFromPrisma.user_id,
          role: userProps.role,
        }
      })

      for (let i = 0; i < userProps.access.length; i++){
        await prisma.access.create({
          data: {
            profile_id: createdProfileFromPrisma.profile_id,
            functionality_id: userProps.access[i]
          }
        })
      }

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

  async getUserByEmail(email: string): Promise<IUserAll> {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
        include: {
          profiles: {
            include: {
              accesses: {
                include: {
                  functionality: true,
                }
              }
            }
          }
        }
      });

      if (!existingUser) {
        throw new ConflictItems("User already exists")
      }

      const formatUserData = (data: any) => {
        const profile = data.profiles[0];
        const accesses = profile ? profile.accesses.map((access: any) => access.functionality.name) : [];

        return {
          id: data.user_id,
          name: data.name,
          email: data.email,
          password: data.password,
          status: data.status as STATUS,
          role: profile ? profile.role : '',
          accesses: accesses,
        };
      };

      return formatUserData(existingUser);

    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw new Error("Erro ao buscar usuário por email");
    }
  }

  async getUserById(id: string): Promise<User | undefined> {
    try {

      if (!id) {
        throw new Error("ID do usuário não pode ser undefined ou null.");
      }
  
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
        createdAt: existingUser.created_at,
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por id:", error);
      throw new Error("Erro ao buscar usuário por id");
    }
  }
  

  async updateUserStatus(id: string, status: STATUS): Promise<boolean> {
    try {
      await prisma.user.update({
        where: {
          user_id: id,
        },
        data: {
          status: status,
        },
      });

      return true;
    } catch (error) {
      console.error("Erro ao atualizar status do usuário:", error);
      throw new Error("Erro ao atualizar status do usuário");
    }
  }
}
