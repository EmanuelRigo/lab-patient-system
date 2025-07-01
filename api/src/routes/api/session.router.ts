import CustomRouter from "../../utils/CustomRouter.util";
import authMiddleware from "../../middlewares/passportCB.middleware";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import labStaffServices from "../../services/labStaff.services";

class SessionRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["PUBLIC"], (req, res) => {
      res.send("¡Bienvenido a las sesiones de la API de MovieList!");
    });

    //REGISTER
    this.create(
      "/register",
      ["PUBLIC"],
      authMiddleware("register"),
      asyncHandler(register)
    );

    //LOGIN
    this.create(
      "/login",
      ["PUBLIC"],
      authMiddleware("login"),
      asyncHandler(login)
    );

    //SIGNOUT
    this.create(
      "/signout",
      ["PUBLIC"],
      authMiddleware("signout"),
      asyncHandler(signout)
    );

    //UPDATE

    //UPDATE-PASSWORD

    //ONLINE

    //DELTE
  };
}

async function register(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { _id } = req.user;
    const message = "User Registered";

    // await labStaffServices.create({
    //   user_id: _id,
    //   movies: [],
    // });

    return res.json201(_id, message);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json500("Internal Server Error");
  }
}

// async function login(req: Request, res: Response) {
//   console.log("object");
//   const _id = "HOLA";
//   const message = "User Registered";

//   return res.json201(_id, message);
// }

async function login(req: Request, res: Response) {
  try {
    if (!req.token || !req.onlineUser || !req.user?.username) {
      return res.status(401).json({ message: "Missing authentication data" });
    }

    const token = req.token as string;
    const onlineUser = req.onlineUser as string;
    const name = req.user.username as string;

    const thirtyDays = 1000 * 60 * 60 * 24 * 30;
    const expirationDate = new Date(Date.now() + thirtyDays);

    const optsToken = {
      maxAge: thirtyDays,
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      expires: expirationDate,
    };

    const optsOnlineToken = {
      maxAge: thirtyDays,
      secure: true,
      sameSite: "strict" as const,
      expires: expirationDate,
    };

    const optsName = {
      maxAge: thirtyDays,
      secure: true,
      sameSite: "none" as const,
      expires: expirationDate,
    };

    const message = "USER LOGGED IN";
    const response = "ok";

    return res
      .cookie("token", token, optsToken)
      .cookie("onlineUser", onlineUser, optsOnlineToken)
      .cookie("name", name, optsName)
      .json200(response, message);
  } catch (error) {
    console.error("Error during login:", error);
    return res.json500("Internal Server Error");
  }
}

const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();
