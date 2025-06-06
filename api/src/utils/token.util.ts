import envsUtils from "./envs.utils";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = envsUtils;

type JwtPayloadData = {
  firstName: string;
  username: string;
  user_id: string;
  role: string;
  isOnline: boolean;
  mode: string;
};

function createTokenUtil(data: JwtPayloadData): string {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 }); // 24h
  return token;
}

function finishTokenUtil(data: JwtPayloadData): string {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 1 });
  return token;
}

function verifyHashUtil(token: string): JwtPayloadData | null {
  const verify = jwt.verify(token, SECRET_KEY) as JwtPayloadData | null;
  return verify;
}

export { createTokenUtil, finishTokenUtil, verifyHashUtil };
export type { JwtPayloadData };
