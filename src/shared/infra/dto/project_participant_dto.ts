export class ProjectParticipantDTO {
    participant_id: number;
    project_id: string;
    user_id: string;
    name: string;



    constructor(project_id: string, user_id: string, participant_id: number, name: string) {
        this.participant_id = participant_id;
        this.project_id = project_id;
        this.user_id = user_id;
        this.name = name;
    }
}