import { Payment } from "../../types/payment.types";
import RestApi from "@/services/restApi";

export default new (class PaymentApi extends RestApi<Payment> {
  constructor() {
    super("payment");
  }
})();
