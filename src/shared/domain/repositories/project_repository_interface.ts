import { ParticipantDTO } from "../../infra/dto/participant_dto";
import { ProjectParticipantDTO } from "../../infra/dto/project_participant_dto";
import { Project } from "../entities/project";
import { STATUS } from "../enums/status_enum";


export interface IProjectRepository {
    createProject(projectName: string, projectDescription: string, projectStatus: STATUS ): Promise<Project>;
    updateProject(projectId: string, projectName?: string, projectDescription?: string, projectStatus?: STATUS): Promise<Project>;
    deleteProject(projectId: string): Promise<void>;
    getProjectById(projectId: string): Promise<Project | undefined>;
    getAllProjects(): Promise<Project[]>;
    updateProjectStatus(projectId: string, projectStatus: STATUS): Promise<Project>;
    createParticipant(projectId: string, userId: string): Promise<ParticipantDTO>;
    getParticipantByProject(project_id: string): Promise<ProjectParticipantDTO[] >;
}
