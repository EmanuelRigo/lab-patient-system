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
    this.read("/", ["public"], asyncHandler(controller.getAll));
    this.read("/:id", ["public"], asyncHandler(controller.getById));
    this.create("/", ["public"], asyncHandler(controller.create));
    this.update("/:id", ["public"], asyncHandler(controller.update));
    this.destroy("/:id", ["public"], asyncHandler(controller.deleteOne));
  };
}

let doctorsAppointmentRouter = new DoctorsAppointmentRouter();
export default doctorsAppointmentRouter.getRouter();
