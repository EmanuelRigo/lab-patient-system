import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { createHashUtil, verifyHashUtil } from "../utils/hash.util";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util";

import LabStaffDTO from "../dto/labStaff.dto";
import labStaffServices from "../services/labStaff.services";

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
        const userExists = await labStaffServices.getByUserName(username);

        if (userExists) {
          const info = {
            message: "User already exists",
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
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const info = {
            message: "EMAIL AND PASSWORD ARE REQUIRED",
            statusCode: 400,
          };
          return done(null, false, info);
        }
        const user = await labStaffServices.getByUserName(email);

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

        await labStaffServices.update(user._id, { isOnline: true });
        const data = {
          firstName: user.firstname,
          username: user.username,
          user_id: user._id,
          role: user.role,
          isOnline: true,
          mode: user.mode,
        };
        const token = createTokenUtil(data);
        req.token = token;
        const onlineUser = createTokenUtil({
          isOnline: true,
        });
        req.onlineUser = onlineUser;
        return done(null, user);
      } catch (error) {
        console.error("Error durante el proceso de autenticación:", error);
        return done(error);
      }
    }
  )
);

import envsUtils from "../utils/envs.utils";
