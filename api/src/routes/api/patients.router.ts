import controller from "../../controllers/patient.controller";
import CustomRouter from "../../utils/CustomRouter.util";

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

class PatientRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["public"], asyncHandler(controller.create));
    this.read("/", ["public"], asyncHandler(controller.getAll));

    // ⚠️ Esta línea debe estar antes de /:id
    this.read("/search", ["public"], asyncHandler(controller.search));

    this.read("/:id", ["public"], asyncHandler(controller.getById));
    this.update("/:id", ["public"], asyncHandler(controller.update));
    this.destroy("/:id", ["public"], asyncHandler(controller.deleteOne));
  };
}

const patientRouter = new PatientRouter();
export default patientRouter.getRouter();
