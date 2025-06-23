import { patientController } from "../../controllers/patient.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class PatientRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["PUBLIC"], patientController.create);
    this.read("/", ["PUBLIC"], patientController.getAll);
    this.read("/:id", ["PUBLIC"], patientController.getById);
    this.update("/:id", ["PUBLIC"], patientController.update);
    this.destroy("/:id", ["PUBLIC"], patientController.deleteOne);
  };
}

let patientRouter = new PatientRouter();
export default patientRouter.getRouter();
