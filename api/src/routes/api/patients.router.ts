import { patientController } from "../../controllers/patient.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class PatientRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["PUBLIC"], patientController.getAll);
    this.update("/:id", ["PUBLIC"], patientController.update);
  };
}

let patientRouter = new PatientRouter();
export default patientRouter.getRouter();
