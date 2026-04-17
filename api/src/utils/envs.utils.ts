import "dotenv/config";

interface EnvConfig {
  PORT: string | undefined;
  MONGO_LINK: string | undefined;

  SECRET_KEY: string;
  SECRET_KEY_FRONTEND: string;
  JWT_SECRET: string;

  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;

  PRODUCTS_COLLECTION: string | undefined;
  MOVIES_COLLECTION: string | undefined;

  BASE_URL: string | undefined;
  BACKEND_URL: string | undefined;

  MODE: string | undefined;
  PERSISTENCE: string | undefined;

  // 🟣 PostgreSQL (nuevo)
  DATABASE_URL: string | undefined;

  // 🔵 MySQL (opcional si lo seguís usando)
  MYSQL_HOST: string | undefined;
  MYSQL_PORT: string | undefined;
  MYSQL_USER: string | undefined;
  MYSQL_PASSWORD: string | undefined;
  MYSQL_DATABASE: string | undefined;
}

// ✅ Validaciones críticas
if (!process.env.SECRET_KEY) {
  throw new Error("Missing SECRET_KEY in .env");
}

if (!process.env.SECRET_KEY_FRONTEND) {
  throw new Error("Missing SECRET_KEY_FRONTEND in .env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env");
}

// 👉 Opcional pero recomendado si usás PostgreSQL
if (process.env.MODE === "POSTGRESQL" && !process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL for PostgreSQL");
}

const envsUtils: EnvConfig = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,

  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_KEY_FRONTEND: process.env.SECRET_KEY_FRONTEND,
  JWT_SECRET: process.env.JWT_SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  PRODUCTS_COLLECTION: process.env.PRODUCTS_COLLECTION,
  MOVIES_COLLECTION: process.env.MOVIES_COLLECTION,

  BASE_URL: process.env.BASE_URL,
  BACKEND_URL: process.env.BACKEND_URL,

  MODE: process.env.MODE,
  PERSISTENCE: process.env.PERSISTENCE,

  // 🟣 PostgreSQL
  DATABASE_URL: process.env.DATABASE_URL,

  // 🔵 MySQL
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
};

export default envsUtils;
