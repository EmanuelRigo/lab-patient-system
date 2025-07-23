// models/talon.model.ts

import { Schema, model, Types } from "mongoose";

const talonSchema = new Schema(
  {
    DAppointmentId: [
      {
        type: Types.ObjectId,
        ref: "DoctorAppointment",
        required: true,
      },
    ],
    ReceptionistID: {
      type: Types.ObjectId,
      ref: "LabStaff",
    },
  },
  { timestamps: true }
);

export default model("Talon", talonSchema);
