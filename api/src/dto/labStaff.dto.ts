import { LabStaff, LabStaffRole } from "../../../types/labStaff.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class LabStaffDTO {
  name: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;

  constructor(data: LabStaff) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role ?? "LabTechnician";
    this.phone = data.phone;
    this.isOnline = data.isOnline ?? false;
  }
}

export default LabStaffDTO;
