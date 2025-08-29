import { model, Schema } from "mongoose";
import { LabStaff } from "../../../../../types/labStaff.types";

const collection = "lab_staff";

const schema = new Schema<LabStaff>(
  {
    firstname: {
      type: String,
      required: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["labTechnician", "biochemist", "receptionist", "admin"],
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
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LabStaffModel = model<LabStaff>(collection, schema);
export default LabStaffModel;
