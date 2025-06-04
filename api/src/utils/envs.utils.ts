import "dotenv/config";
import { Secret } from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("Missing SECRET_KEY in environment variables");
}

export default {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
  SECRET_KEY: process.env.SECRET_KEY as Secret,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  PRODUCTS_COLLECTION: process.env.PRODUCTS_COLLECTION,
  MOVIES_COLLECTION: process.env.MOVIES_COLLECTION,
  BASE_URL: process.env.BASE_URL,
  MODE: process.env.MODE,
  JWT_SECRET: process.env.JWT_SECRET,
};
