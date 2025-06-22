import { Router } from "express";
import patientsApiRouter from "./patients.router";
import labStaffRouter from "./labStaff.router";
import medicaStudyRouter from "./medicaStudy.router";
import doctorsAppointmentRouter from "./doctorsAppointment.router";
const apiRouter = Router();

apiRouter.get("/ping", (_req, res) => {
  res.send("pong 🏓");
});

apiRouter.use("/labstaff", labStaffRouter);
apiRouter.use("/patient", patientsApiRouter);
apiRouter.use("/medicalstudy", medicaStudyRouter);
apiRouter.use("/doctorAppointment", doctorsAppointmentRouter);
// apiRouter.use("/payment", paymentRouter);
// apiRouter.use("/paymentTalon", paymentTalonRouter);
// apiRouter.use("/talon", talonRouter);

export default apiRouter;
