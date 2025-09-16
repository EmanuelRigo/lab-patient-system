import { Schema, model, Types } from "mongoose";
import { Payment } from "../../../../../types/payment.types";

const collection = "payments";

const paymentSchema = new Schema<Payment>(
  {
    _id: {
      type: String, // varchar(24) en MySQL → string en Mongo
      required: true,
    },
    amount: {
      type: Number, // decimal(10,2) → Decimal128 para precisión financiera
      required: true,
    },
    paymentMethodId: {
      type: String, // varchar(24), puede ser un ObjectId si lo preferís
      ref: "paymentMethods", // si tenés una colección relacionada
    },
    talonId: {
      type: String, // también varchar(24), opcional
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    _id: false, // si querés usar el _id manual como string
  }
);

const PaymentModel = model<Payment>(collection, paymentSchema);
export default PaymentModel;
