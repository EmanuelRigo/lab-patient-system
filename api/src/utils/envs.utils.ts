import "dotenv/config";
import { Secret } from "jsonwebtoken"; // Importa el tipo Secret para mayor claridad

interface EnvConfig {
  PORT: string | undefined;
  MONGO_LINK: string | undefined;
  SECRET_KEY: string; // Marcamos como string, ya que nos aseguraremos de que esté presente
  SECRET_KEY_FRONTEND: string; // Marcamos como string, ya que nos aseguraremos de que esté presente
  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  PRODUCTS_COLLECTION: string | undefined;
  MOVIES_COLLECTION: string | undefined;
  BASE_URL: string | undefined;
  MODE: string | undefined;
  PERSISTENCE: string | undefined;
  JWT_SECRET: string | undefined;
  BACKEND_URL: string | undefined;

  MYSQL_HOST: string | undefined;
  MYSQL_PORT: string | undefined;
  MYSQL_USER: string | undefined;
  MYSQL_PASSWORD: string | undefined;
  MYSQL_DATABASE: string | undefined;
}

// Realiza la validación de las variables de entorno críticas inmediatamente
if (!process.env.SECRET_KEY) {
  throw new Error(
    "Missing SECRET_KEY in environment variables. Please set it in your .env file."
  );
}

if (!process.env.SECRET_KEY_FRONTEND) {
  throw new Error(
    "Missing SECRET_KEY in environment variables. Please set it in your .env file."
  );
}

if (!process.env.JWT_SECRET) {
  // Si también usas JWT_SECRET para otros propósitos, valídalo también
  throw new Error(
    "Missing JWT_SECRET in environment variables. Please set it in your .env file."
  );
}

const envsUtils: EnvConfig = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
  SECRET_KEY: process.env.SECRET_KEY, // Ahora TypeScript sabe que es un string
  SECRET_KEY_FRONTEND: process.env.SECRET_KEY_FRONTEND, // Ahora TypeScript sabe que es un string
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  PRODUCTS_COLLECTION: process.env.PRODUCTS_COLLECTION,
  MOVIES_COLLECTION: process.env.MOVIES_COLLECTION,
  BASE_URL: process.env.BASE_URL,
  MODE: process.env.MODE,
  PERSISTENCE: process.env.PERSISTENCE,
  JWT_SECRET: process.env.JWT_SECRET,
  BACKEND_URL: process.env.BACKEND_URL,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
};

export default envsUtils;
