import controller from "../../controllers/payment.controller";
import CustomRouter from "../../utils/CustomRouter.util";

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

class PaymentRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["PUBLIC"], asyncHandler(controller.create));
    this.read("/", ["PUBLIC"], asyncHandler(controller.getAll));
    this.read("/:id", ["PUBLIC"], asyncHandler(controller.getById));
    this.update("/:id", ["PUBLIC"], asyncHandler(controller.update));
    this.destroy("/:id", ["PUBLIC"], asyncHandler(controller.deleteOne));
  };
}

let paymentRouter = new PaymentRouter();
export default paymentRouter.getRouter();
