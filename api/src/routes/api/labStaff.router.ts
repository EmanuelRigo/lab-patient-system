import controller from "../../controllers/labStaff.controller";
import CustomRouter from "../../utils/CustomRouter.util";

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

class LabStaffRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["public"], asyncHandler(controller.getAll));
    this.read("/:id", ["public"], asyncHandler(controller.getById));
    // this.create("/", ["public"], asyncHandler(controller.create));
    this.update("/:id", ["public"], asyncHandler(controller.update));
    this.destroy("/:id", ["admin"], asyncHandler(controller.deleteOne));
  };
}

let labStaffRouter = new LabStaffRouter();
export default labStaffRouter.getRouter();
