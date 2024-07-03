import { Project } from "../../../shared/domain/entities/project";

export class GetProjectByIdViewModel {
    projectId?: string;
    projectName: string;
    projectDescription: string;
    projectStatus: string;

    constructor(project: Project) {
        this.projectId = project.projectId ?? '';
        this.projectName = project.projectName;
        this.projectDescription = project.projectDescription;
        this.projectStatus = project.projectStatus;
    }


}
