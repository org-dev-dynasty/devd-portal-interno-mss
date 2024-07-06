import { GetTaskByIdUseCase } from "./get_task_by_id_usecase";
import { Request, Response } from "express";

export class GetTaskByIdController {
    constructor(private getTaskByIdUsecase: GetTaskByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const taskId: number = Number(req.params.taskId);

      const task = await this.getTaskByIdUsecase.execute(taskId);

      if (!task) {
        return res.status(422).json({ error: "Task not found" });
      }

      const taskViewModel = new GetTaskByIdViewmodel(task);

      return res.status(200).json(taskViewModel);
    } catch (error: any) {
      console.error("Error in handle:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
}