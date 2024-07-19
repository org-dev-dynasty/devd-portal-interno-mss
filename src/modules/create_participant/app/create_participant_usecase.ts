import { get } from "http";
import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface";
import { BadRequest, UnprocessableEntity } from "../../../shared/helpers/http/http_codes";


export class CreateParticipantUseCase {
    constructor(private repoProject:IProjectRepository, private repoUser:IUserRepository) {
    }
    async execute(project_id: string, user_id: string) {
       try {

        const projectExist = this.repoProject.getProjectById(project_id);
        
        if (!projectExist) {
            throw new UnprocessableEntity("Project not found");
        }

        const userExist = this.repoUser.getUserById(user_id);

        if (!userExist) {
            throw new UnprocessableEntity("Invalid user id");
        }

        const participant = await this.repoProject.createParticipant(project_id, user_id);
        return participant;
       }
       catch (error) {
              throw new BadRequest("Error creating participant");
       }
    }
}