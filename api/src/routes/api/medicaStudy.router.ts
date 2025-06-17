import { medicalStudyController } from "../../controllers/medicalStudy.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class LabStaffRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.read("/", ["PUBLIC"], medicalStudyController.getAll);
    this.create("/", ["PUBLIC"], medicalStudyController.create);
    this.update("/:id", ["PUBLIC"], medicalStudyController.update);
    this.destroy("/:id", ["PUBLIC"], medicalStudyController.deleteOne);
  };
}

let medicalStudyRouter = new LabStaffRouter();
export default medicalStudyRouter.getRouter();
