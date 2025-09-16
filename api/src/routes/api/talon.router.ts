import controller from "../../controllers/talon.controller";
import CustomRouter from "../../utils/CustomRouter.util";

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

class TalonRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["public"], asyncHandler(controller.create));
    this.read("/", ["public"], asyncHandler(controller.getAll));
    this.read("/:id", ["public"], asyncHandler(controller.getById));
    this.update(
      "/:id",
      ["public"],
      asyncHandler(controller.updateWithAppointments)
    );
    this.destroy("/:id", ["public"], asyncHandler(controller.deleteOne));
  };
}

let talonRouter = new TalonRouter();
export default talonRouter.getRouter();
