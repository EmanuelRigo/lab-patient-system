import { LabStaff } from "../../../types/labStaff.types";
import { LabStaffRole } from "../../../types/labStaff.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class LabStaffDTO {
  firstname: string;
  secondName?: string;
  lastname: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline?: boolean = false;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;

  constructor(data: LabStaff) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    } else {
      this._id = data._id;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
    this.firstname = data.firstname;
    this.secondName = data.secondName;
    this.lastname = data.lastname;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role ?? "LabTechnician";
    this.phone = data.phone;
    this.isOnline = data.isOnline ?? false;
  }
}

export default LabStaffDTO;
