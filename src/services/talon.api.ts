import { Talon } from "../../types/talon.types";
import { Payment } from "../../types/payment.types";
import RestApi from "@/services/restApi";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;

class TalonApi extends RestApi<Talon> {
  constructor() {
    super("talon");
  }

  async createWithPayment(talon: Partial<Talon>, payment: Partial<Payment>) {
    const res = await fetch(`${BACKEND_URL}/api/talon/create-with-payment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ talon, payment }),
    });

    if (!res.ok) {
      throw new Error("❌ No se pudo crear el talon con el pago.");
    }

    const data = await res.json();
    return data.data as Talon;
  }
}

export default new TalonApi();
