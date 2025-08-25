export type LabStaffRole =
  | "Receptionist"
  | "LabTechnician"
  | "Biochemist"
  | "Admin";

export interface LabStaff {
  firstname: string;
  secondName?: string;
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
