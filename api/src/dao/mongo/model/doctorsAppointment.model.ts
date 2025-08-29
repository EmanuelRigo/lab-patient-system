import { model, Schema } from "mongoose";
import { DoctorAppointment } from "../../../../../types/doctorsAppointment.types";

const collection = "doctors_appointments";

const doctorsAppointmentSchema = new Schema<DoctorAppointment>(
  {
    isPaid: {
      type: Boolean,
      default: false,
    },
    patientId: {
      type: String,
      required: true,
    },
    medicalStudyId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
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

const DoctorsAppointmentModel = model<DoctorAppointment>(
  collection,
  doctorsAppointmentSchema
);

export default DoctorsAppointmentModel;
