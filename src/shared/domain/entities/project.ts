import { EntityError } from "../../helpers/errors/domain_errors";
import { STATUS } from "../enums/status_enum";


export class Project {
    private project_id?: string;
    private project_name: string;
    private project_status: STATUS;
    private project_description: string;

    constructor(projectName: string, projectDescription: string, projectStatus: STATUS ) {
        if (!Project.isValidName(projectName)) {
            throw new EntityError("Invalid project name");
        }

        if (!Project.isValidStatus(projectStatus)) {
            throw new EntityError("Invalid project status");
        }

        if (projectDescription && projectDescription.trim().length === 0) {
            throw new EntityError("Invalid project description");
        }

        this.project_name = projectName; 
        this.project_status = projectStatus;
        this.project_description = projectDescription;
    }


    get projectId(): string | undefined {
        return this.project_id;
    }

    get projectName(): string {
        return this.project_name;
    }

    get projectStatus(): STATUS {
        return this.project_status;
    }

    get projectDescription(): string {
        return this.project_description;
    }

    setProjectName(projectName: string): void {
        if (!Project.isValidName(projectName)) {
            throw new EntityError("Invalid project name");
        }
        this.project_name = projectName;
    }

    setProjectStatus(projectStatus: STATUS): void {
        if (!Project.isValidStatus(projectStatus)) {
            throw new EntityError("Invalid project status");
        }
        this.project_status = projectStatus;
    }

    serProjectDescription(projectDescription: string): void { 
        if (projectDescription && projectDescription.trim().length === 0) {
            throw new EntityError("Invalid project description");
        }
        this.project_description = projectDescription
    }  

    static isValidName(projectname: string): boolean {
        projectname = projectname.trim();
        return projectname.length > 0 && projectname.length <= 100;
    }

    static isValidStatus(projectStatus: STATUS): boolean {
        if (projectStatus == null) {
            return false;
        }

        if (Object.values(STATUS).includes(projectStatus) == false) {
            return false;
        }

        return true;
    }

    static isValidDescription(projectDescription: string): boolean { 
        projectDescription = projectDescription.trim();
        return projectDescription.length <= 500;
    }
}
