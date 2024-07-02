import { User } from "../../../shared/domain/entities/user";

export class GetUserByEmailViewmodel {
    id: string;
    name: string;
    email: string;
    status: string;
    
    constructor(user: User) {
        this.id = user.userId ?? '';
        this.name = user.name;
        this.email = user.email;
        this.status = user.status;
    }
}