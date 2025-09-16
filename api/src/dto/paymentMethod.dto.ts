import { PaymentMethod } from "../../../types/paymentMethod.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class PaymentMethodDTO {
  _id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: PaymentMethod) {
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.name = data.name;
    this.description = data.description ?? null;
    this.isActive = data.isActive ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default PaymentMethodDTO;
