import { Project, ProjectProps } from "../entities/project";
import { STATUS } from "../enums/status_enum";


export interface IProjectRepository { 
    createProject(projectProps: Project): Promise<Project>;
    updateProject(projectId: string, projectName?: string, projectDescription?: string, projectStatus?: STATUS): Promise<Project>;
    deleteProject(projectId: string): Promise<void>;
    getProjectById(projectId: string): Promise<Project | undefined>;
    getAllProjects(): Promise<Project[]>;
    updateProjectStatus(projectId: string, projectStatus: STATUS): Promise<Project>;
}  
