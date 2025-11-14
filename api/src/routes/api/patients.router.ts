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
    this.create("/", ["receptionist"], asyncHandler(controller.create));
    this.read("/", ["receptionist", "admin"], asyncHandler(controller.getAll));

    // ⚠️ Esta línea debe estar antes de /:id
    this.read(
      "/search",
      ["receptionist", "admin"],
      asyncHandler(controller.getByNameLastName)
    );

    this.read(
      "/:id",
      ["receptionist", "admin"],
      asyncHandler(controller.getById)
    );
    this.update(
      "/:id",
      ["receptionist", "admin"],
      asyncHandler(controller.update)
    );
    this.destroy("/:id", ["admin"], asyncHandler(controller.deleteOne));
  };
}

const patientRouter = new PatientRouter();
export default patientRouter.getRouter();
