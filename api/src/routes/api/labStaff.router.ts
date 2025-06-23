import { labStaffController } from "../../controllers/labStaff.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class LabStaffRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["PUBLIC"], labStaffController.getAll);
    this.read("/:name", ["PUBLIC"], labStaffController.getByName);
    this.create("/", ["PUBLIC"], labStaffController.create);
    this.update("/:id", ["PUBLIC"], labStaffController.update);
    this.destroy("/:id", ["PUBLIC"], labStaffController.deleteOne);
  };
}

let labStaffRouter = new LabStaffRouter();
export default labStaffRouter.getRouter();
