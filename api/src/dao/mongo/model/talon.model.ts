import { model, Schema } from "mongoose";
import { Talon } from "../../../../../types/talon.types";

const collection = "talons";

const talonSchema = new Schema<Talon>(
  {
    IdPatient: {
      type: String,
      required: true,
    },
    IdLabTechnician: {
      type: String,
      required: true,
    },
    IdBiochemist: {
      type: String,
      required: true,
    },
    statusPayment: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    IdPayment: {
      type: String,
      required: true,
    },
    IdReceptionist: {
      type: String,
      required: true,
    },
    IdDoctorAppointment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TalonModel = model<Talon>(collection, talonSchema);
export default TalonModel;
