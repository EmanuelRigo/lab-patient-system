import { Payment } from "../../types/payment.types";
import RestApi from "@/services/restApi";

class PaymentApi extends RestApi<Payment> {
  constructor() {
    super("doctorAppointment");
  }
}

const paymentApi = new PaymentApi();

export default paymentApi;
