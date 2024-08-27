import { IProjectRepository } from "../../../shared/domain/repositories/project_repository_interface";
import { NoContent } from "../../../shared/helpers/http/http_codes";
import { ProjectParticipantDTO } from "../../../shared/infra/dto/project_participant_dto";

export class GetParticipantByProjectUseCase {
  constructor(private repoProject: IProjectRepository) {}

  async execute(project_id: string): Promise<ProjectParticipantDTO[]> {
    try {
      const participant = await this.repoProject.getParticipantByProject(project_id);
      
      if (participant.length === 0) {
        throw new NoContent("Participant not found");
      }

      return participant;
    } catch (error) {
      console.error("Erro ao buscar participant por id:", error);
      throw new Error("Erro ao buscar usuário por id");
    }
  }
}
