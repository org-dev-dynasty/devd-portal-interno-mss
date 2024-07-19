export class ParticipantDTO {
    private participant_id?: number;
    private project_id: string;
    private user_id: string;

    constructor(project_id: string, user_id: string, participant_id?: number) {
        this.participant_id = participant_id;
        this.project_id = project_id;
        this.user_id = user_id;
    }

    
}