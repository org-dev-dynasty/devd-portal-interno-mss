import { User } from "../../../shared/domain/entities/user";
import { STATUS } from "../../../shared/domain/enums/status_enum";

export class GetAllUsersViewmodel {
  id?: string;
  name: string;
  email: string;
  status: STATUS;
  createdAt?: Date;

  constructor(user: User) {
    this.id = user.userId ?? '';
    this.name = user.name;
    this.email = user.email;
    this.status = user.status;
    this.createdAt = user.createdAt ?? new Date();
  }
}