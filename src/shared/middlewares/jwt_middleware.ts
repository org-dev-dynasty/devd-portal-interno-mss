import "cookie-parser";
import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EntityError } from "../helpers/errors/domain_errors";

export type UserFromToken = {
  user_id: string;
  role: string;
  access: string[];
  projects: string[];
};

declare module "express" {
  interface Request {
    user?: UserFromToken;
  }
}

export function authenticateToken(
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["token"];

  console.log("Received token:", token);

  if (!token) {
    console.log("Token not provided");
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserFromToken;

    if (!decoded) {
      throw new EntityError("Invalid token");
    }

    const user = decoded;
    console.log("User from token:", user);

    req.user = user;

    next();
  } catch (error: any) {
    console.log("Error decoding token:", error);
    if (error instanceof EntityError) {
      return res.sendStatus(403);
    }
    return res.sendStatus(500);
  }
}