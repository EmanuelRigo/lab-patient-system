import { Router } from "express";
import patientsApiRouter from "./patients.router";
import labStaffRouter from "./labStaff.router";

const apiRouter = Router();

apiRouter.get("/ping", (_req, res) => {
  res.send("pong 🏓");
});

apiRouter.use("/patient", patientsApiRouter); // Esto monta /api/patient
apiRouter.use("/labstaff", labStaffRouter);

export default apiRouter;
