import { Payment } from "../../../types/payment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class PaymentDTO {
  amount: number;
  method: "credit_card" | "debit_card" | "cash" | "bank_transfer";
  talonId: string;
  _id: string;
  patientId: string;
  receptionistId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Payment) {
    this.amount = data.amount;
    this.method = data.method;
    this.talonId = data.talonId;
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.patientId = data.patientId;
    this.receptionistId = data.receptionistId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default PaymentDTO;
