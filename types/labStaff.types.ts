export type LabStaffRole =
  | "admin"
  | "receptionist"
  | "labTechnician"
  | "biochemist";

export interface LabStaff {
  _id: string;
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
}
