// src/routers/cookies.router.ts
import { Request, Response, NextFunction } from "express";
import CustomRouter from "../../utils/CustomRouter.util";
import asyncHandler from "../../middlewares/asyncHandler.middleware";

class CookiesRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  private init() {
    // this.create("/create", ["PUBLIC"], asyncHandler(this.createCookie));
    this.read("/read", ["PUBLIC"], asyncHandler(this.readCookies));
  }

  //   private createCookie = (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const { mode } = req.body;
  //       const message = "cookie created";

  //       return res
  //         .status(200)
  //         .cookie("mode", mode || "light", {
  //           secure: true,
  //           sameSite: "none",
  //           httpOnly: false,
  //         })
  //         .json({ message });
  //     } catch (error) {
  //       return next(error);
  //     }
  //   };

  private readCookies = (req: Request, res: Response, next: NextFunction) => {
    try {
      const mode = req.cookies.mode;
      const username = req.cookies.name;
      const userRole = req.cookies.userRole;
      const message = "cookie read";

      return res.status(200).json({ mode, username, userRole, message });
    } catch (error) {
      return next(error);
    }
  };
}

const cookiesRouter = new CookiesRouter();
export default cookiesRouter.getRouter();
