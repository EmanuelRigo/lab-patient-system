import CustomRouter from "../../utils/CustomRouter.util";

import { Router } from "express";
import doctorsAppointmentRouter from "./doctorsAppointment.router";
import labStaffRouter from "./labStaff.router";
import medicalStudyRouter from "./medicalStudy.router";
import patientsApiRouter from "./patients.router";
import paymentRouter from "./payment.router";
import paymentMethodRouter from "./paymentMethod.router";
import resultRouter from "./result.router";
import talonRouter from "./talon.router";

import sessionRouter from "./session.router";
import cookiesRouter from "./cookies.router";

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
      ["public"],
      asyncHandler(doctorsAppointmentRouter)
    );

    this.use("/labStaff", ["public"], asyncHandler(labStaffRouter));

    this.use("/medicalStudy", ["public"], asyncHandler(medicalStudyRouter));

    this.use("/patient", ["public"], asyncHandler(patientsApiRouter));

    this.use("/payment", ["public"], asyncHandler(paymentRouter));

    this.use("/paymentMethod", ["public"], asyncHandler(paymentMethodRouter));

    this.use("/result", ["public"], asyncHandler(resultRouter));

    this.use("/talon", ["public"], asyncHandler(talonRouter));

    this.use("/session", ["public"], sessionRouter);

    this.use("/cookies", ["public"], asyncHandler(cookiesRouter));
  };
}

let indexRouter = new IndexRouter();

export default indexRouter.getRouter();
