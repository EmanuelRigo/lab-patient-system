import { model, Schema } from "mongoose";

const collection = "Patients";

const schema = new Schema(
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
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PatientModel = model(collection, schema);
export default PatientModel;
