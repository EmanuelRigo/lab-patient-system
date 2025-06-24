import { model, Schema } from "mongoose";
import { LabStaff } from "../../../../../types/labStaff.types";

const collection = "lab_staff";

const schema = new Schema<LabStaff>(
  {
    name: {
      type: String,
      required: true,
      index: true,
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
      enum: ["LabTechnician", "Biochemist", "Receptionist", "Admin"],
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
