import { Request, Response } from "express";
import { InvalidParameter, InvalidRequest } from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { BadRequest, Forbidden, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import { UpdateTaskStatusUsecase } from "./update_task_status_usecase";

export class updateTaskStatusController {
    constructor(private updateTaskStatusUseCase: UpdateTaskStatusUsecase ) {
        this.updateTaskStatusUseCase = updateTaskStatusUseCase;
    }
    async handle(req: Request, res: Response) {
        const { taskId, status } = req.body;
        try {
            const result = await this.updateTaskStatusUseCase.execute(
                taskId,
                status,
            );

            if (result) {
                return res.status(200).json({ message: "Task atualizada com sucesso" });
            }
            
        }
        catch (error: any) {
            if (error instanceof InvalidRequest) {
                return res.status(400).json(new BadRequest(error.message));
            }
            if (error instanceof InvalidParameter) {
                return res.status(400).json(new ParameterError(error.message));
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