import { EntityError } from "../../helpers/errors/domain_errors";




export class Credential {
    private credential_id?: string; 
    private project_id?: string;
    private env_name: string;
    private env_content: string;

    constructor(project_id: string, env_name: string, env_content: string) { 
        if (!Credential.isValidProjectId(project_id)) {
            throw new EntityError("Invalid project id");
        }

        if (!Credential.isValidEnvName(env_name)) {
            throw new EntityError("Invalid env name");
        }

        if (!Credential.isValidEnvContent(env_content)) {
            throw new EntityError("Invalid env content");
        }
        this.project_id = project_id;
        this.env_name = env_name;
        this.env_content = env_content;
    }

    get credentialId(): string | undefined  { 
        return this.credential_id;
    }

    get projectId(): string | undefined { 
        return this.project_id;
    }

    get envName(): string { 
        return this.env_name;
    }

    get envContent(): string { 
        return this.env_content;
    }   

    setProjectId(project_id: string): void { 
        if (!Credential.isValidProjectId(project_id)) {
            throw new EntityError("Invalid project id");
        }
        this.project_id = project_id;
    }

    setEnvName(env_name: string): void { 
        if (!Credential.isValidEnvName(env_name)) {
            throw new EntityError("Invalid env name");
        }
        this.env_name = env_name;
    }

    setEnvContent(env_content: string): void { 
        if (!Credential.isValidEnvContent(env_content)) {
            throw new EntityError("Invalid env content");
        }
        this.env_content = env_content;
    }

    static isValidEnvName(envName: string): boolean { 
        envName = envName.trim();
        return envName.length > 0 && envName.length <= 50;
    }

    static isValidEnvContent(envContent: string): boolean { 
        envContent = envContent.trim();
        return envContent.length > 0 && envContent.length <= 500;
    }

    static isValidProjectId(projectId: string): boolean { 
        projectId = projectId.trim();
        return projectId.length > 0 && projectId.length <= 50;
    }
}