import { model, Schema } from "mongoose";
import { DoctorAppointment } from "../../../../../types/doctorsAppointment.types";

const collection = "doctors_appointments";

const doctorsAppointmentSchema = new Schema<DoctorAppointment>(
  {
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
      required: false,
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
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["status_scheduled", "status_completed", "status_cancelled"],
      default: "status_scheduled",
    },
  },
  { timestamps: true }
);

const DoctorsAppointmentModel = model<DoctorsAppointment>(
  collection,
  doctorsAppointmentSchema
);

export default DoctorsAppointmentModel;
