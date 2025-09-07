import controller from "../../controllers/doctorsAppointment.controller";
import CustomRouter from "../../utils/CustomRouter.util";

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

class DoctorsAppointmentRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["admin", "receptionist"], asyncHandler(controller.getAll));
    this.read(
      "/:id",
      ["admin", "receptionist"],
      asyncHandler(controller.getById)
    );
    this.create("/", ["receptionist"], asyncHandler(controller.create));
    this.update(
      "/:id",
      ["labTechnician", "receptionist"],
      asyncHandler(controller.update)
    );
    this.destroy(
      "/:id",
      ["admin", "receptionist"],
      asyncHandler(controller.deleteOne)
    );
  };
}

let doctorsAppointmentRouter = new DoctorsAppointmentRouter();
export default doctorsAppointmentRouter.getRouter();
