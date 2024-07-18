import { UpdateTaskUsecase } from "./update_task_usecase";
import { Request, Response } from "express";
import { UpdateTaskViewmodel } from "./update_task_viewmodel";
import { Forbidden, InternalServerError, ParameterError, UnprocessableEntity } from "../../../shared/helpers/http/http_codes";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";


export class UpdateTaskController {
    constructor(private updateTask: UpdateTaskUsecase) {
        this.updateTask = updateTask;
    }
    async handle(req: Request, res: Response) {
        try {
            const userAccess = req.user?.access;
            if (!userAccess?.includes("BTN-UPDATE-TASK")) {
                throw new Forbidden('You do not have permission to access this feature');
            }
            const { name, status, description, finish_date } = req.body;
            const taskId = Number(req.params.id);

            if (!taskId) {
                return res.status(400).json({ message: "Invalid task id" });
            }



            let data: any = {};
  
            if (name !== undefined) {
              data["name"] = name;
            }
        
            if (status !== undefined) {
              data["status"] = status;
            }
        
            if (description !== undefined) {
              data["description"] = description;
            }
        
            if (finish_date !== undefined) {
              data["finish_date"] = finish_date;
            }

            const result = await this.updateTask.execute(taskId, data);
            
            if (result) {
                const viewModel = new UpdateTaskViewmodel("Task updated successfully");
                return res.status(200).json(viewModel);
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