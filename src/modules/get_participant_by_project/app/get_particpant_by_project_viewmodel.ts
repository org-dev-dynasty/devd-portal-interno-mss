import { ProjectParticipantDTO } from "../../../shared/infra/dto/project_participant_dto";

export class GetParticipantByProjectViewmodel {
    id: number;
    project_id: string;
    user_id: string;
    name: string;
    
    constructor(participant: ProjectParticipantDTO) {
        this.id = participant.participant_id;
        this.project_id = participant.project_id;
        this.user_id = participant.user_id;
        this.name = participant.name;
    }

    toJSON() {
        return {
            id: this.id,
            project_id: this.project_id,
            user_id: this.user_id,
            name: this.name
        }
    }
}