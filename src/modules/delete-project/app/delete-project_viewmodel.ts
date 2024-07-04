import { Project } from "../../../shared/domain/entities/project";

export class DeleteProjectViewModel {
    project_id?: string;
    projectName: string;
    projectDescription: string;
    projectStatus: string;

    constructor(project: Project) {
        this.project_id = project.projectId ?? '';
        this.projectName = project.projectName;
        this.projectDescription = project.projectDescription;
        this.projectStatus = project.projectStatus;
    }

    toJSON() {
        return {
            project_id: this.project_id,
            projectName: this.projectName,
            projectDescription: this.projectDescription,
            projectStatus: this.projectStatus
        }
    }


}
