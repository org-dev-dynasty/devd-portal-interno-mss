export class ResponsibleDTO {
    private participant_id: number;
    private task_id: number;
    private responsible_id?: number;
    private responsible_name?: string;

    constructor(task_id: number, participant_id: number, responsible_id?: number) {
        this.participant_id = participant_id;
        this.task_id = task_id;
        this.responsible_id = responsible_id;
    }

    
}