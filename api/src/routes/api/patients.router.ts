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
    this.create("/", ["PUBLIC"], asyncHandler(controller.create));
    this.read("/", ["PUBLIC"], asyncHandler(controller.getAll));

    // ⚠️ Esta línea debe estar antes de /:id
    this.read("/search", ["PUBLIC"], asyncHandler(controller.search));

    this.read("/:id", ["PUBLIC"], asyncHandler(controller.getById));
    this.update("/:id", ["PUBLIC"], asyncHandler(controller.update));
    this.destroy("/:id", ["PUBLIC"], asyncHandler(controller.deleteOne));
  };
}

const patientRouter = new PatientRouter();
export default patientRouter.getRouter();
