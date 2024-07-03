import express, { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../../shared/infra/repositories/user_repository_prisma";
import { updateUserStatusController } from "./update_user_status_controller";
import { UpdateUserStatusUsecase } from "./update_user_status_usecase";

const router = express.Router();
const userRepository = new UserRepositoryPrisma();
const updateUserStatusUsecase = new UpdateUserStatusUsecase(userRepository);
const userController = new updateUserStatusController(updateUserStatusUsecase);

router.put("/update-user-status", async (req: Request, res: Response) => {
  await userController.handle(req, res);
});

export default router;