import { model, Schema } from "mongoose";

const collection = "lab_staff";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["Technician", "Scientist", "Assistant"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["morning", "afternoon", "night"],
      required: true,
    },
  },
  { timestamps: true }
);

const LabStaffModel = model(collection, schema);
export default LabStaffModel;
