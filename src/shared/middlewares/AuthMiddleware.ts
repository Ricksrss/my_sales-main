import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { verify, Secret } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}

export default class AuthMiddleware {
  static execute(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT Token is missing.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret) as ITokenPayload;

      const { sub } = decodedToken;

      req.user = {
        id: sub,
      };

      return next();
    } catch {
  throw new AppError("Invalid JWT Token.", 401);
}
  }
}

