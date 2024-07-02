import { Request, Response } from "express";
import { AuthUserUsecase } from "./auth_user_usecase";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import { BadRequest, InternalServerError, ParameterError } from "../../../shared/helpers/http/http_codes";
import jwt from "jsonwebtoken";

export class AuthUserController {
  constructor(private usecase: AuthUserUsecase) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return new BadRequest("Email and password are required").send(res);
      }

      const user = await this.usecase.execute(email, password);

      const token = jwt.sign(
        { id: user.userId, email: user.email, role: user.role, status: user.status },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
      );

      res.status(200).json({ token });
    } catch (error: any) {
      if (error instanceof NoItemsFound || error instanceof EntityError) {
        return new ParameterError(error.message).send(res);
      }
      return new InternalServerError(error.message).send(res);
    }
  }
}
