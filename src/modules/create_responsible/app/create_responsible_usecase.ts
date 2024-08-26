import { ITaskRepository } from "../../../shared/domain/repositories/task_repository_interface";
import { ParticipantDTO } from "../../../shared/infra/dto/participant_dto";

export class CreateResponsibleUseCase {
  constructor(private repoTask: ITaskRepository, private participantDTO: ParticipantDTO) {
  }
  async execute(task_id: number, participant_id: number) {
    try {

     const projectExist = this.repoProject.getProjectById(project_id);
     
     if (!projectExist) {
         throw new UnprocessableEntity("Project not found");
     }

     const userExist = this.repoUser.getUserById(user_id);

     if (!userExist) {
         throw new UnprocessableEntity("Invalid user id");
     }
}
