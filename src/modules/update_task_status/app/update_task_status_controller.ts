import { Request, Response } from "express";
import { TASK_STATUS } from "../../../shared/domain/enums/task_status_enum";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { Forbidden, InternalServerError, ParameterError, UnprocessableEntity } from "../../../shared/helpers/http/http_codes";
import { UpdateTaskStatusUsecase } from "./update_task_status_usecase";

export class updateTaskStatusController {
    constructor(private updateTaskStatusUseCase: UpdateTaskStatusUsecase ) {
        this.updateTaskStatusUseCase = updateTaskStatusUseCase;
    }
    async handle(req: Request, res: Response) {
        try {
            const {status} = req.body;
            const taskId = Number(req.params.id);
            if (!taskId) {
                throw new UnprocessableEntity("Invalid task id");
            }

            if (!status) {
                throw new UnprocessableEntity("Invalid status");
            }

            if (!Object.values(TASK_STATUS).includes(status)) {
                throw new UnprocessableEntity("Invalid status")
            }

            const result = await this.updateTaskStatusUseCase.execute(
                taskId,
                status,
            );

            if (result) {
                return res.status(200).json({ message: "Task atualizada com sucesso" });
            }
            
        }
        catch (error: any) {
            if (error instanceof UnprocessableEntity) {
                return res.status(422).json(new UnprocessableEntity(error.getMessage()));
            }
            
            if (error instanceof EntityError) {
                return res.status(400).json(new ParameterError(error.message));
            }
            if (error instanceof Forbidden) {
                return res.status(403).json(new Forbidden(error.getMessage()));
            }
            return res.status(500).json(new InternalServerError("Internal Server Error"));
        }
    }
}