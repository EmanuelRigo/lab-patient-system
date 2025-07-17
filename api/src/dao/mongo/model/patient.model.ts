import { model, Schema } from "mongoose";
import { Patient } from "../../../../../types/patient.types";

const collection = "Patients";

const schema = new Schema<Patient>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PatientModel = model<Patient>(collection, schema);
export default PatientModel;
