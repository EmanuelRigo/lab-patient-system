import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import pathHandler from "./middlewares/pathHandler.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import indexRouter from "./routes/api/index.router";
import MongoSingleton from "./utils/mongoDB.utils";

dotenv.config();

const app = express();

// app.get("/api/ping", (_req, res) => {
//   res.send("pong 🏓");
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/", indexRouter);

MongoSingleton.getInstance();

app.use((_req, _res, next) => pathHandler(_req, _res, next));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend listening at http://localhost:${PORT}`);
});
