import envsUtils from "./envs.utils";
import jwt from "jsonwebtoken";

const { SECRET_KEY, SECRET_KEY_FRONTEND } = envsUtils;

type JwtPayloadData = {
  firstName: string;
  username: string;
  user_id: string;
  role: string;
  isOnline: boolean;
};

function createTokenUtil(data: JwtPayloadData): string {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 }); // 24h
  return token;
}

function createUserInfoToken(data: { username: string; role: string }) {
  return jwt.sign(data, SECRET_KEY_FRONTEND, { expiresIn: "30d" });
}

function finishTokenUtil(data: JwtPayloadData): string {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 1 });
  return token;
}

function verifyTokenUtil(token: string): JwtPayloadData | null {
  const verify = jwt.verify(token, SECRET_KEY) as JwtPayloadData | null;
  return verify;
}

export {
  createTokenUtil,
  finishTokenUtil,
  verifyTokenUtil,
  createUserInfoToken,
};
export type { JwtPayloadData };
