import passport from "./passport.middleware";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { VerifiedCallback } from "passport-jwt";

// Tipar `info`, `user`, `err` adecuadamente
interface PassportInfo {
  statusCode?: number;
  message?: string;
}

interface CustomUser {
  _id: string;
  username: string;
  role: string;
  // podés agregar más propiedades si tu usuario las tiene
}

// Extender Express para usar `req.user`
declare module "express" {
  interface Request {
    user?: CustomUser;
  }
}

export default function authMiddleware(strategy: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      strategy,
      (err: unknown, user: CustomUser | false, info: PassportInfo) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(info?.statusCode || 400).json({
            statusCode: info?.statusCode || 400,
            message: info?.message || "ERROR",
          });
        }

        req.user = user;
        return next();
      }
    )(req, res, next);
  };
}
