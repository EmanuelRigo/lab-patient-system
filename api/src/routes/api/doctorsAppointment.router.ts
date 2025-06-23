import { doctorsAppointmentController } from "../../controllers/doctorsAppointment.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class DoctorsAppointmentRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["PUBLIC"], doctorsAppointmentController.getAll);
    this.read("/:name", ["PUBLIC"], doctorsAppointmentController.getByName);
    this.create("/", ["PUBLIC"], doctorsAppointmentController.create);
    this.update("/:id", ["PUBLIC"], doctorsAppointmentController.update);
    this.destroy("/:id", ["PUBLIC"], doctorsAppointmentController.deleteOne);
  };
}

let doctorsAppointmentRouter = new DoctorsAppointmentRouter();
export default doctorsAppointmentRouter.getRouter();
