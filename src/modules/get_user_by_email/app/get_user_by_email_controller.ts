import { Request, Response } from "express";
import { GetUserByEmailUseCase } from "./get_user_by_email_usecase";
import { GetUserByEmailViewmodel } from "./get_user_by_email_viewmodel"; 

export class GetUserByEmailController {
  constructor(private usecase: GetUserByEmailUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      if(!userId) return res.status(422).json({ error: "Email not found" });
      console.log(userId)

      const user = await this.usecase.execute(userId);

      if (!user) {
        return res.status(422).json({ error: "User not found" });
      }

      const userViewModel = new GetUserByEmailViewmodel(user);

      return res.status(200).json(userViewModel);
    } catch (error: any) {
      console.error("Error in handle:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
