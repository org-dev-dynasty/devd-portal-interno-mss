import { Project } from "../../../shared/domain/entities/project";

export class UpdateProjectViewModel {
    project_id: string;
    projectName?: string;
    projectDescription?: string;
    projectStatus?: string;

    constructor(project: Project) {
        this.project_id = project.projectId ?? '';
        this.projectName = project.projectName;
        this.projectDescription = project.projectDescription;
        this.projectStatus = project.projectStatus;
    }
}
