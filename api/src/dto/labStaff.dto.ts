import { LabStaff } from "../../../types/labStaff.types";
import { LabStaffRole } from "../../../types/labStaff.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class LabStaffDTO {
  _id?: string;
  firstname: string;
  secondname?: string;
  lastname: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline?: boolean = false;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: LabStaff) {
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.firstname = data.firstname;
    this.secondname = data.secondname;
    this.lastname = data.lastname;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.phone = data.phone;
    this.isOnline = data.isOnline ?? false;
  }
}

export default LabStaffDTO;
