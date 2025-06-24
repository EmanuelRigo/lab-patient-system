import { Payment } from "../../../types/payment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class PaymentDTO {
  amount: number;
  method: "credit_card" | "debit_card" | "cash" | "bank_transfer";
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Payment) {
    this.amount = data.amount;
    this.method = data.method;
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default PaymentDTO;
