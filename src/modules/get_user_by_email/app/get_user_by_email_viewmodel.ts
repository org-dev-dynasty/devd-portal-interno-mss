import { IUserAll } from "../../../shared/domain/entities/user";

export class GetUserByEmailViewmodel {
    id: string;
    name: string;
    email: string;
    status: string;
    
    constructor(user: IUserAll) {
        this.id = user.id ?? '';
        this.name = user.name;
        this.email = user.email;
        this.status = user.status;
    }
}