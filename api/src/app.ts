import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import pathHandler from "./middlewares/pathHandler.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import indexRouter from "./routes/api/index.router";
import MongoSingleton from "./utils/mongoDB.utils";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.config";

dotenv.config();

const app = express();

app.get("/api/ping", (_req, res) => {
  res.send("pong 🏓");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    origin: (origin, callback) => {
      const defaultAllowed = [
        "http://localhost:3000",
        "https://lab-patient-system-4ays.vercel.app",
        "https://lab-patient-system.vercel.app",
      ];

      const envAllowed = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
        : [];

      const allowedOrigins = Array.from(
        new Set([...defaultAllowed, ...envAllowed]),
      );

      console.log(
        "CORS check - origin:",
        origin,
        "allowedOrigins:",
        allowedOrigins,
      );

      // Permitir solicitudes sin origen (por ejemplo, herramientas como Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("CORS blocked origin:", origin);
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permitir cookies (Access-Control-Allow-Credentials)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  }),
);

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// MongoSingleton.getInstance();

app.use("/api/", indexRouter);

app.use((req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend listening at http://localhost:${PORT}`);
});

app.use((_req, _res, next) => pathHandler(_req, _res, next));
app.use(errorHandler);
