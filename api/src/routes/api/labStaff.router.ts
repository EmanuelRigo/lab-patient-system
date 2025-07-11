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
    this.read("/", ["PUBLIC"], asyncHandler(controller.getAll));
    this.read("/:id", ["PUBLIC"], asyncHandler(controller.getById));
    this.create("/", ["PUBLIC"], asyncHandler(controller.create));
    this.update("/:id", ["PUBLIC"], asyncHandler(controller.update));
    this.destroy("/:id", ["PUBLIC"], asyncHandler(controller.deleteOne));
  };
}

let labStaffRouter = new LabStaffRouter();
export default labStaffRouter.getRouter();
