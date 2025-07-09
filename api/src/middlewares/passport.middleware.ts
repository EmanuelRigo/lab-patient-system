import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import envsUtils from "../utils/envs.utils";
import { Request } from "express";

// Extend Express Request interface to include custom properties
declare global {
  namespace Express {
    interface Request {
      token?: string;
      onlineUser?: string;
      userInfoToken?: string;
    }
  }
}

import { createHashUtil, verifyHashUtil } from "../utils/hash.util";
import {
  createTokenUtil,
  createUserInfoToken,
  verifyTokenUtil,
} from "../utils/token.util";

import LabStaffDTO from "../dto/labStaff.dto";
import labStaffServices from "../services/labStaff.services";

import { LabStaff } from "../../../types/labStaff.types";

const { BASE_URL } = envsUtils;

//--REGISTER
passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "username",
    },
    async (req, username, password, done) => {
      try {
        const userExists = await labStaffServices.getByName(username);

        if (userExists) {
          const info = {
            message: "UserName already exists",
            statusCode: 400,
          };
          return done(null, false, info);
        }
        req.body.password = createHashUtil(password);
        const data = new LabStaffDTO(req.body);
        const user = await labStaffServices.create(data);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//--LOGIN
passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "username",
    },
    async (req, username, password, done) => {
      try {
        if (!username || !password) {
          const info = {
            message: "EMAIL AND PASSWORD ARE REQUIRED",
            statusCode: 400,
          };
          return done(null, false, info);
        }
        const user = await labStaffServices.getByUsername(username);

        if (!user) {
          const info = {
            message: "INVALID CREDENTIALS1",
            statusCode: 401,
          };
          return done(null, false, info);
        }

        const verify = verifyHashUtil(password, user.password);
        if (!verify) {
          const info = {
            message: "INVALID CREDENTIALS2",
            statusCode: 401,
          };
          return done(null, false, info);
        }

        if (user._id) {
          await labStaffServices.update(user._id, { isOnline: true });
        } else {
          const info = {
            message: "User ID is missing",
            statusCode: 500,
          };
          return done(null, false, info);
        }
        const data = {
          firstName: user.firstName,
          username: user.username,
          user_id: user._id,
          role: user.role,
          isOnline: true,
        };

        const token = createTokenUtil(data);

        req.token = token;

        const onlineUser = createTokenUtil({
          firstName: user.firstName,
          username: user.username,
          user_id: user._id,
          role: user.role,
          isOnline: true,
        });

        req.onlineUser = onlineUser;

        const userInfoToken = createUserInfoToken({
          username: user.username,
          role: user.role,
        });

        req.userInfoToken = userInfoToken;

        return done(null, user);
      } catch (error) {
        console.error("Error durante el proceso de autenticación:", error);
        return done(error);
      }
    }
  )
);

//--SIGNOUT
passport.use(
  "signout",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: String(envsUtils.SECRET_KEY),
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        await labStaffServices.update(user_id, { isOnline: false });
        return done(null, { user_id: null });
      } catch (error) {
        const info = {
          message: "Error in signout process",
          statusCode: 500,
        };
        return done(null, false, info);
      }
    }
  )
);

//--UPDATE
passport.use(
  "update",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: String(envsUtils.SECRET_KEY),
      passReqToCallback: true,
    },
    async (req, data, done) => {
      console.log("🚀 ~ data:", data);
      console.log("📦 ~ req.body:", req.body);

      try {
        const { user_id } = data;
        const user = await labStaffServices.getById(user_id);

        if (!user) {
          return done(null, false, {
            message: "USER NOT FOUND",
            statusCode: 404,
          });
        }

        const updatedUser = await labStaffServices.update(user_id, req.body);
        console.log("🚀 ~ updatedUser:", updatedUser);

        return done(null, updatedUser);
      } catch (error) {
        return done(null, false, {
          message: "Error in update process",
          statusCode: 500,
        });
      }
    }
  )
);

//--UPDATE PASSWORD
passport.use(
  "updatePassword",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: String(envsUtils.SECRET_KEY),
      passReqToCallback: true,
    },
    async (req, data, done) => {
      console.log("🚀 ~ req:", req.body);
      try {
        const { user_id } = data;
        const user = await labStaffServices.getById(user_id);

        if (!user) {
          return done(null, false, {
            message: "USER NOT FOUND",
            statusCode: 404,
          });
        }

        const { currentPassword, newPassword } = req.body;

        // 1. Verificar contraseña actual
        const verify = verifyHashUtil(currentPassword, user.password);
        if (!verify) {
          return done(null, false, {
            message: "INVALID CURRENT PASSWORD",
            statusCode: 401,
          });
        }

        // 2. Hashear la nueva contraseña
        const hashedPassword = createHashUtil(newPassword);

        // 3. Actualizar usuario
        const updatedUser = await labStaffServices.update(user_id, {
          password: hashedPassword,
        });

        return done(null, updatedUser);
      } catch (error) {
        return done(null, false, {
          message: "Error in password update process",
          statusCode: 500,
        });
      }
    }
  )
);

//--DELETE ACCOUNT
// passport.use(
//   "deleteAccount",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
//       secretOrKey: String(envsUtils.SECRET_KEY),
//       passReqToCallback: true,
//     },
//     async (req, data, done) => {
//       console.log("🚀 ~ data:", data);
//       console.log("-reqbody", req.body);

//       try {
//         const { user_id } = data;
//         const user = await labStaffServices.getById(user_id);
//         console.log("🚀 ~ user:", user);
//         if (!user) {
//           const info = {
//             message: "INVALID CREDENTIALS1",
//             statusCode: 401,
//           };
//           return done(null, false, info);
//         }

//         const verify = verifyHashUtil(req.body.password, user.password);
//         if (!verify) {
//           const info = {
//             message: "INVALID CREDENTIALS2",
//             statusCode: 401,
//           };
//           return done(null, false, info);
//         }

//         const deletedUser = await labStaffServices.deleteOne(user_id);
//         console.log("🚀 ~ deletedUser:", deletedUser);

//         // await labStaffServices.delete(user_id);
//         return done(null, { message: "User deleted successfully" });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

//--ADMIN
passport.use(
  "admin",
  new JwtStrategy(
    {
      // jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(envsUtils.SECRET_KEY),
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        if (role !== "ADMIN") {
          const info = {
            message: "NOT AUTHORIZED",
            statusCode: 403,
          };
          return done(null, false, info);
        }
        const user = await labStaffServices.getById(user_id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//--
passport.use(
  "online",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: String(envsUtils.SECRET_KEY),
    },
    async (data, done) => {
      console.log("🚀 ~ data:", data);
      try {
        const { user_id } = data;
        const user = await labStaffServices.getById(user_id);
        console.log("Usuario encontrado:", user);

        if (!user) {
          const info = {
            message: "USER NOT FOUND",
            statusCode: 404,
          };
          return done(null, false, info);
        }

        const { isOnline } = user;
        if (!isOnline) {
          const info = {
            message: "USER IS NOT ONLINE",
            statusCode: 401,
          };
          return done(null, false, info);
        }

        const userData = {
          firstName: user.firstName,
          username: user.username,
          user_id: user._id,
          role: user.role,
          isOnline: user.isOnline,
          email: user.email,
        };

        console.log("Usuario en línea:", userData);
        return done(null, userData);
      } catch (error) {
        const info = {
          message: "Error in JWT strategy",
          statusCode: 500,
        };
        return done(null, false, info);
      }
    }
  )
);

export default passport;
