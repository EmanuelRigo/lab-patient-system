import { model, Schema } from "mongoose";
import { DoctorsAppointment } from "../../../../../types/doctorsAppointment.types";

const collection = "doctors_appointments";

const doctorsAppointmentSchema = new Schema<DoctorsAppointment>(
  {
    patientId: {
      type: String,
      required: true,
    },
    medicalStudyId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const DoctorsAppointmentModel = model<DoctorsAppointment>(
  collection,
  doctorsAppointmentSchema
);

export default DoctorsAppointmentModel;
