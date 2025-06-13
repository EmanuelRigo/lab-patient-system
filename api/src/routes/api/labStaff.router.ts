import { labStaffController } from "../../controllers/labStaff.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class LabStaffRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["PUBLIC"], labStaffController.getAll);
  };
}

let labStaffRouter = new LabStaffRouter();
export default labStaffRouter.getRouter();
