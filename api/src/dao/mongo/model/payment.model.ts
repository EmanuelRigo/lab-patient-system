import { model, Schema, Types } from "mongoose";
import { Payment } from "../../../../../types/payment.types";

const collection = "payments";

const paymentSchema = new Schema<Payment>(
  {
    amount: {
      type: Number,
      required: true,
    },
    talonId: Types.ObjectId,

    method: {
      type: String,
      enum: ["credit_card", "debit_card", "cash", "bank_transfer"],
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentModel = model<Payment>(collection, paymentSchema);
export default PaymentModel;
