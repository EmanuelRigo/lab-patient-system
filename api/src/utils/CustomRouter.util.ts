import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import jwt from "jsonwebtoken";
import envUtil from "./envs.utils";
import labStaffServices from "../services/labStaff.services";

// Interface para el payload del JWT
interface JwtPayload {
  role: "USER" | "admin";
  userId: string;
  iat?: number;
  exp?: number;
}

type Policy = "public" | "receptionist" | "labTechnician" | "admin";

class CustomRouter {
  private _router = Router();

  getRouter = () => this._router;

  applyCallbacks = (callbacks: RequestHandler[]): RequestHandler[] =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        next(error);
      }
    });

  responses = (req: Request, res: Response, next: NextFunction): void => {
    res.json200 = (response, message = "Success") =>
      res.status(200).json({ response, message });

    res.json201 = (response, message = "Created") =>
      res.status(201).json({ response, message });

    res.json302 = () => res.status(302).json({ message: "Movie exists" });

    res.json400 = (message) => res.status(400).json({ error: message });

    res.json401 = () => res.status(401).json({ error: "Bad Auth!" });

    res.json403 = () => res.status(403).json({ error: "Forbidden!" });

    res.json404 = () => res.status(404).json({ error: "Not found!" });

    res.json500 = (message) => res.status(500).json({ error: message });

    next();
  };

  policies = (policies: Policy[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (policies.includes("public")) return next();

        const token = req?.cookies?.token;
        if (!token) {
          res.json401();
          return;
        }

        const decoded = jwt.verify(token, envUtil.SECRET_KEY) as unknown;

        if (
          typeof decoded !== "object" ||
          decoded === null ||
          !("role" in decoded) ||
          !("userId" in decoded)
        ) {
          res.json401();
          return;
        }

        const { role, userId } = decoded as JwtPayload;

        if (policies.includes("admin") && role === "admin") {
          const user = await labStaffServices.getById(userId);
          if (!user) {
            res.json401();
            return;
          }
          (req as any).user = user;
          return next();
        }

        res.json403();
      } catch (error: any) {
        console.error(error);
        res.json400(error.message);
      }
    };
  };

  create = (path: string, policies: Policy[], ...cbs: RequestHandler[]) =>
    this._router.post(
      path,
      this.responses,
      this.policies(policies),
      ...this.applyCallbacks(cbs)
    );

  read = (path: string, policies: Policy[], ...cbs: RequestHandler[]) =>
    this._router.get(
      path,
      this.responses,
      this.policies(policies),
      ...this.applyCallbacks(cbs)
    );

  update = (path: string, policies: Policy[], ...cbs: RequestHandler[]) =>
    this._router.put(
      path,
      this.responses,
      this.policies(policies),
      ...this.applyCallbacks(cbs)
    );

  destroy = (path: string, policies: Policy[], ...cbs: RequestHandler[]) =>
    this._router.delete(
      path,
      this.responses,
      this.policies(policies),
      ...this.applyCallbacks(cbs)
    );

  use = (path: string, policies: Policy[], ...cbs: RequestHandler[]) =>
    this._router.use(
      path,
      this.responses,
      this.policies(policies),
      ...this.applyCallbacks(cbs)
    );
}

export default CustomRouter;
