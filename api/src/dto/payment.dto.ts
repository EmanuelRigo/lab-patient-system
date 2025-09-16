import { Payment } from "../../../types/payment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class PaymentDTO {
  _id: string;
  amount: number | undefined;
  talonId: string;
  paymentMethodId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Payment) {
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.amount = data.amount;
    this.talonId = data.talonId;
    this.paymentMethodId = data.paymentMethodId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default PaymentDTO;
