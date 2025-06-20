import { LabStaff, LabStaffRole } from "../../../types/labStaff.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

interface LabStaffData {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role?: LabStaffRole;
  phone: string;
  department: string;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class LabStaffDTO {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: LabStaffRole;
  phone: string;
  department: string;
  isOnline: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: LabStaffData) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role ?? "Technician";
    this.phone = data.phone;
    this.department = data.department;
    this.isOnline = data.isOnline ?? false;
  }
}

export default LabStaffDTO;
