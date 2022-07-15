import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token incorreto", 401);
  }

  next()
}
