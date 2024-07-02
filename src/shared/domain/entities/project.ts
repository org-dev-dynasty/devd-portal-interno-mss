import { EntityError } from "../../helpers/errors/domain_errors";
import { STATUS } from "../enums/status_enum";


export interface ProjectProps {
    projectId?: string;
    projectName: string;
    projectStatus: STATUS;
    projectDescription?: string;
}

export class Project {
    constructor(public props: ProjectProps) {
        this.validateProps(props);
    }

    private validateProps(props: ProjectProps) {
        if (!Project.isValidName(props.projectName)) {
            throw new EntityError("Invalid project name");
        }

        if (!Project.isValidStatus(props.projectStatus)) {
            throw new EntityError("Invalid project status");
        }

        if (props.projectDescription && props.projectDescription.trim().length === 0) {
            throw new EntityError("Invalid project description");
        }
    }

    get projectId(): string | undefined {
        return this.props.projectId;
    }

    get projectName(): string {
        return this.props.projectName;
    }

    get projectStatus(): STATUS {
        return this.props.projectStatus;
    }

    get projectDescription(): string | undefined {
        return this.props.projectDescription;
    }

    setProjectName(projectName: string): void {
        if (!Project.isValidName(projectName)) {
            throw new EntityError("Invalid project name");
        }
        this.props.projectName = projectName;
    }

    setProjectStatus(projectStatus: STATUS): void {
        if (!Project.isValidStatus(projectStatus)) {
            throw new EntityError("Invalid project status");
        }
        this.props.projectStatus = projectStatus;
    }

    serProjectDescription(projectDescription: string): void { 
        if (projectDescription && projectDescription.trim().length === 0) {
            throw new EntityError("Invalid project description");
        }
        this.props.projectDescription = projectDescription
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
