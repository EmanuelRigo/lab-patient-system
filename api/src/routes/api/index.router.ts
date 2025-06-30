import CustomRouter from "../../utils/CustomRouter.util";

import { Router } from "express";
import doctorsAppointmentRouter from "./doctorsAppointment.router";
import labStaffRouter from "./labStaff.router";
import medicalStudyRouter from "./medicalStudy.router";
import patientsApiRouter from "./patients.router";
import paymentRouter from "./payment.router";
import resultRouter from "./result.router";
import talonRouter from "./talon.router";

const apiRouter = Router();

apiRouter.get("/ping", (_req, res) => {
  res.send("pong 🏓");
});

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

class IndexRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.use(
      "/doctorAppointment",
      ["PUBLIC"],
      asyncHandler(doctorsAppointmentRouter)
    );

    this.use("/labStaff", ["PUBLIC"], asyncHandler(labStaffRouter));

    this.use("/medicalStudy", ["PUBLIC"], asyncHandler(medicalStudyRouter));

    this.use("/patient", ["PUBLIC"], asyncHandler(patientsApiRouter));

    this.use("/payment", ["PUBLIC"], asyncHandler(paymentRouter));

    this.use("/result", ["PUBLIC"], asyncHandler(resultRouter));

    this.use("/talon", ["PUBLIC"], asyncHandler(talonRouter));
  };
}

let indexRouter = new IndexRouter();

export default indexRouter.getRouter();

// apiRouter.use("/doctorAppointment", doctorsAppointmentRouter);
// apiRouter.use("/labstaff", labStaffRouter);
// apiRouter.use("/medicalstudy", medicalStudyRouter);
// apiRouter.use("/patient", patientsApiRouter);
// apiRouter.use("/payment", paymentRouter);
// apiRouter.use("/result", resultRouter);
// apiRouter.use("/talon", talonRouter);

// export default apiRouter;
