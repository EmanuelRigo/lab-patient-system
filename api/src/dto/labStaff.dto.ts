import { LabStaff, LabStaffRole } from "../../../types/labStaff.types";

interface LabStaffData {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: LabStaffRole;
  phone: string;
  department: string;
  isOnline?: boolean;
}

class LabStaffDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  role: LabStaffRole;
  phone: string;
  department: string;
  isOnline: boolean;

  constructor(data: LabStaffData) {
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
