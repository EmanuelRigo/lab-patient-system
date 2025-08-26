export type LabStaffRole =
  | "role_receptionist"
  | "role_lab_technician"
  | "role_biochemist"
  | "role_admin";

export interface LabStaff {
  firstname: string;
  secondname?: string;
  lastname: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
