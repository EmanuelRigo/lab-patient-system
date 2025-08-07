import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import pathHandler from "./middlewares/pathHandler.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import indexRouter from "./routes/api/index.router";
import MongoSingleton from "./utils/mongoDB.utils";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// app.get("/api/ping", (_req, res) => {
//   res.send("pong 🏓");
// });

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://movie-list-jade-kappa.vercel.app",
      ];

      // Permitir solicitudes sin origen (por ejemplo, herramientas como Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permitir cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  })
);

MongoSingleton.getInstance();

app.use("/api/", indexRouter);

app.use((req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

app.use((_req, _res, next) => pathHandler(_req, _res, next));
app.use(errorHandler);

export default app;
