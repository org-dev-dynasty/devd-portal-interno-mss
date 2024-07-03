import { Project, ProjectProps } from "../entities/project";


export interface IProjectRepository { 
    createProject(projectProps: Project): Promise<Project>;
    // updateProject(project: Project): Promise<Project>;
    // deleteProject(projectId: string): Promise<void>;
    // getProjectById(projectId: string): Promise<Project | undefined>;
    getAllProjects(): Promise<Project[]>;
}  
