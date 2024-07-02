import { EntityError } from "../../helpers/errors/domain_errors";
import { STATUS } from "../enums/status_enum";

export interface TaskProps {
    taskId?: string;
    taskName: string;
    create_user_id: string;
    taskStatus: STATUS;
    taskDescription?: string;
    taskFinishDate?: Date;
    taskCreatedAt?: Date;
}

export class Task {
    constructor(public props: TaskProps) {
        this.validateProps(props);
    }

    private validateProps(props: TaskProps) {
        if (!Task.isValidName(props.taskName)) {
            throw new EntityError("Invalid task name");
        }

        if (!Task.isValidStatus(props.taskStatus)) {
            throw new EntityError("Invalid task status");
        }

        if (props.taskDescription && props.taskDescription.trim().length === 0) {
            throw new EntityError("Invalid task description");
        }
    }
    
    get taskId(): string | undefined {
        return this.props.taskId;
    }

    get taskName(): string {
        return this.props.taskName;
    }

    get taskStatus(): string {
        return this.props.taskStatus;
    }

    get taskDescription(): string | undefined {
        return this.props.taskDescription;
    }

    get taskFinishDate(): Date | undefined {
        return this.props.taskFinishDate;
    }

    get taskCreatedAt(): Date | undefined {
        return this.props.taskCreatedAt;
    }

    setTaskName(taskName: string): void {
        if (!Task.isValidName(taskName)) {
            throw new EntityError("Invalid task name");
        }
        this.props.taskName = taskName;
    }

    setTaskStatus(taskStatus: STATUS): void {
        if (!Task.isValidStatus(taskStatus)) {
            throw new EntityError("Invalid task status");
        }
        this.props.taskStatus = taskStatus;
    }

    setTaskDescription(taskDescription: string): void {
        if (taskDescription && taskDescription.trim().length === 0) {
            throw new EntityError("Invalid task description");
        }
        this.props.taskDescription = taskDescription;
    }

    setTaskFinishDate(taskFinishDate: Date): void {
        this.props.taskFinishDate = taskFinishDate;
    }

    setTaskCreatedAt(taskCreatedAt: Date): void {
        this.props.taskCreatedAt = taskCreatedAt;
    }

    static isValidName(taskName: string): boolean {
        taskName = taskName.trim();
        return taskName.length > 0 && taskName.length <= 100;
    }

    static isValidStatus(taskStatus: STATUS): boolean {
        if (taskStatus == null) {
            return false;
        }

        return true;
    }
}