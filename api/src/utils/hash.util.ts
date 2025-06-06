import { genSaltSync, hashSync, compareSync } from "bcrypt";

function createHashUtil(password: string): string {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  return hashPassword;
}

function verifyHashUtil(password: string, dbPass: string): boolean {
  const verify = compareSync(password, dbPass);
  return verify;
}

export { createHashUtil, verifyHashUtil };
