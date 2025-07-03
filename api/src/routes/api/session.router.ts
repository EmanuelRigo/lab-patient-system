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
    this.update(
      "/update",
      ["PUBLIC"],
      authMiddleware("update"),
      asyncHandler(update)
    );

    //UPDATE-PASSWORD
    this.update(
      "/update-password",
      ["PUBLIC"],
      authMiddleware("updatePassword"),
      asyncHandler(update)
    );

    //ONLINE
    this.create(
      "/online",
      ["PUBLIC"],
      authMiddleware("online"),
      asyncHandler(onlineToken)
    );

    //DELETE
    // this.destroy(
    //   "/delete",
    //   ["PUBLIC"],
    //   authMiddleware("deleteAccount"),
    //   asyncHandler(deleteAccount)
    // );
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

async function login(req: Request, res: Response) {
  try {
    if (!req.token || !req.onlineUser || !req.user?.username) {
      return res.status(401).json({ message: "Missing authentication data" });
    }

    const token = req.token as string;
    const onlineUser = req.onlineUser as string;
    const name = req.user.username as string;
    const userInfoToken = req.userInfoToken as string;

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

    const optsInfoUserToken = {
      maxAge: thirtyDays,
      httpOnly: false, // 🔓 accesible por frontend
      secure: true,
      sameSite: "lax" as const, // o "none" si usás diferentes dominios
      expires: expirationDate,
    };

    const message = "USER LOGGED IN";
    const response = "ok";

    return res
      .cookie("token", token, optsToken)
      .cookie("infoUserToken", userInfoToken, optsInfoUserToken)
      .cookie("onlineUser", onlineUser, optsOnlineToken)
      .cookie("name", name, optsName)
      .json200(response, message);
  } catch (error) {
    console.error("Error during login:", error);
    return res.json500("Internal Server Error");
  }
}

function signout(req: Request, res: Response) {
  for (const cookie in req.cookies) {
    res.clearCookie(cookie, { sameSite: "none", secure: true });
  }
  return res
    .status(200)
    .json({ response: "OK", message: "Todas las cookies eliminadas" });
}

async function update(req: Request, res: Response) {
  try {
    const message = "User Updated";
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const response = req.user.username;
    return res.json200(response, message);
  } catch (error) {
    console.error("Error during update:", error);
    return res.json500("Internal Server Error");
  }
}

async function onlineToken(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const message = req.user.username.toUpperCase() + " IS ONLINE";
  const response = req.user;
  return res.json200(response, message);
}

async function deleteAccount(req: Request, res: Response) {
  for (const cookie in req.cookies) {
    res.clearCookie(cookie, { sameSite: "none", secure: true });
  }
  return res.json200(req.user, "Account deleted");
}

const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();
